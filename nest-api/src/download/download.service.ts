import { Injectable } from '@nestjs/common';
import { WeatherService } from '../weather/weather.service';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';
import { Weather } from 'src/weather/schemas/weather.schema/weather.schema';

@Injectable()
export class DownloadService {
  constructor(private readonly weatherService: WeatherService) {}

  async generateXlsx(): Promise<Buffer> {
    const weatherData = await this.weatherService.findAll();
    const flattenedData = this.flattenWeatherData(weatherData);
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'WeatherData');
    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }

  async generateCsv(): Promise<string> {
    const weatherData = await this.weatherService.findAll();
    const flattenedData = this.flattenWeatherData(weatherData);
    return Papa.unparse(flattenedData);
  }

  private flattenWeatherData(weatherData: Weather[]) {
    const flattened = [];

    weatherData.forEach((weather) => {
      const {
        source,
        location,
        observed_at,
        current,
        forecast_daily,
        forecast_hourly,
      } = weather;

      const base = {
        source,
        'location.city': location.city,
        'location.latitude': location.latitude,
        'location.longitude': location.longitude,
        observed_at,
      };

      if (current) {
        flattened.push({
          ...base,
          type: 'current',
          time: current.time,
          temp: current.temp,
          windspeed: current.windspeed,
          winddirection: current.winddirection,
          humidity: current.humidity,
          cloud: current.cloud,
          rain: current.rain,
        });
      }

      if (forecast_hourly) {
        forecast_hourly.forEach((forecast) => {
          flattened.push({
            ...base,
            type: 'hourly_forecast',
            time: forecast.time,
            temp: forecast.temp,
            humidity: forecast.humidity,
            cloud: forecast.cloud,
            rain: forecast.rain,
          });
        });
      }

      if (forecast_daily) {
        forecast_daily.forEach((forecast) => {
          flattened.push({
            ...base,
            type: 'daily_forecast',
            date: forecast.date,
            min_temp: forecast.min,
            max_temp: forecast.max,
          });
        });
      }
    });

    return flattened;
  }
}
