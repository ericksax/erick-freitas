import { CreateWeatherDto } from './dto/create-weather.dto';

export class WeatherMapper {
  static fromDto(dto: CreateWeatherDto) {
    // -----------------------------------------------------
    // 1) Determinar índice da hora atual
    // -----------------------------------------------------
    const currentIndex = dto.hourly.time.indexOf(dto.current_weather.time);

    // Fallback seguro
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;

    // -----------------------------------------------------
    // 2) CURRENT corrigido com hourly
    // -----------------------------------------------------
    const current = {
      time: dto.current_weather.time,
      temp: dto.current_weather.temperature,
      windspeed: dto.current_weather.windspeed,
      winddirection: dto.current_weather.winddirection,

      // Agora usando o índice correto
      humidity: dto.hourly.relativehumidity_2m[safeIndex] ?? null,
      cloud: dto.hourly.cloudcover[safeIndex] ?? null,
      rain: dto.hourly.precipitation_probability[safeIndex] ?? null,
    };

    // -----------------------------------------------------
    // 3) HOURLY
    // -----------------------------------------------------
    const forecast_hourly = dto.hourly.time.map((t, i) => ({
      time: t,
      temp: dto.hourly.temperature_2m[i],
      humidity: dto.hourly.relativehumidity_2m[i],
      cloud: dto.hourly.cloudcover[i],
      rain: dto.hourly.precipitation_probability[i],
    }));

    // -----------------------------------------------------
    // 4) DAILY
    // -----------------------------------------------------
    const forecast_daily = dto.daily.time.map((d, i) => ({
      date: d,
      min: dto.daily.temperature_2m_min[i],
      max: dto.daily.temperature_2m_max[i],
    }));

    // -----------------------------------------------------
    // 5) Retorno final
    // -----------------------------------------------------
    return {
      source: dto.source,
      location: dto.location,
      observed_at: new Date(dto.observed_at),
      current,
      forecast_hourly,
      forecast_daily,
    };
  }
}
