import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Weather,
  WeatherDocument,
} from './schemas/weather.schema/weather.schema';
import { CreateWeatherDto } from './dto/create-weather.dto/create-weather.dto';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
  ) {}

  async create(dto: CreateWeatherDto): Promise<Weather> {
    const created = new this.weatherModel({
      ...dto,
      observed_at: new Date(dto.observed_at),
    });
    return created.save();
  }

  async findAll(): Promise<Weather[]> {
    return this.weatherModel.find().sort({ observed_at: -1 }).limit(500).lean();
  }
}
