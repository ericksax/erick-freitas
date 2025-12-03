import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Weather,
  WeatherDocument,
} from './schemas/weather.schema/weather.schema';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { WeatherMapper } from './weather-mapper';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
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
}
