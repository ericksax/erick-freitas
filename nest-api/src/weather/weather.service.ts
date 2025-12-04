import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Weather,
  WeatherDocument,
} from './schemas/weather.schema/weather.schema';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { WeatherMapper } from './weather-mapper';
import { AIService } from 'src/ai/ai.service';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
    private readonly ai: AIService,
  ) {}

  async create(dto: CreateWeatherDto): Promise<Weather> {
    const data = WeatherMapper.fromDto(dto);
    return this.weatherModel.create(data);
  }

  async findAll(): Promise<Weather[]> {
    return this.weatherModel.find().sort({ observed_at: -1 }).limit(500).lean();
  }

  findLastOne(): Promise<Weather> {
    return this.weatherModel.findOne().sort({ observed_at: -1 }).lean();
  }

  async generateInsights() {
    const weather = await this.findLastOne();
    if (!weather) return { message: 'Nenhum dado encontrado.' };

    const prompt = `
      Analise cuidadosamente os dados meteorológicos fornecidos abaixo.
      Com base na análise, GERE EXCLUSIVAMENTE E APENAS um objeto JSON.
      O objeto JSON DEVE seguir rigorosamente a seguinte estrutura:

      {
        "tendencias": ["Array de strings descrevendo tendências climáticas (Ex: 'Aumento gradual de temperatura nos próximos 3 dias')."],
        "alertas": ["Array de strings com alertas de risco (Ex: 'Alto risco de chuva forte na noite de quinta-feira'). Se não houver alertas, use []."],
        "recomendacoes": ["Array de strings com recomendações de ações (Ex: 'Recomenda-se o uso de casaco leve pela manhã')."],
        "resumo": "String curta e concisa (máximo 15 palavras) com o resumo da previsão para as próximas 24 horas."
      }

      DADOS PARA ANÁLISE:
      
      Localização: ${JSON.stringify(weather.location)}
      
      Atual: ${JSON.stringify(weather.current)}
      
      Próximos dias: ${JSON.stringify(weather.forecast_daily)}
      
      Próximos horas: ${JSON.stringify(weather.forecast_hourly)}
    `;

    return await this.ai.generateJSON(prompt);
  }
}
