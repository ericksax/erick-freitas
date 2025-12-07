import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Weather,
  WeatherSchema,
} from './schemas/weather.schema/weather.schema';
import { AIModule } from 'src/ai/ai.module';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService],
  imports: [
    AIModule,
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
  ],
})
export class WeatherModule {}
