import { Type, Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class LocationDto {
  @IsOptional()
  @IsString()
  city?: string | null;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsLongitude()
  longitude: number;
}

export class CurrentWeatherDto {
  @IsString()
  time: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  temperature: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  windspeed: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  winddirection: number;
}

export class HourlyDto {
  @IsArray()
  @IsString({ each: true })
  time: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  temperature_2m: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  relativehumidity_2m: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  cloudcover: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  precipitation_probability: number[];
}

export class DailyDto {
  @IsArray()
  @IsString({ each: true })
  time: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  temperature_2m_min: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  temperature_2m_max: number[];
}

export class CreateWeatherDto {
  @IsString()
  source: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsDateString()
  observed_at: string;

  @IsOptional()
  @Transform(({ value }) => (value === null ? null : Number(value)))
  @IsNumber()
  temperature_c: number | null;

  @IsOptional()
  @Transform(({ value }) => (value === null ? null : Number(value)))
  @IsNumber()
  humidity_percent: number | null;

  @IsOptional()
  @Transform(({ value }) => (value === null ? null : Number(value)))
  @IsNumber()
  wind_speed_m_s: number | null;

  @IsOptional()
  @Transform(({ value }) => (value === null ? null : Number(value)))
  @IsNumber()
  wind_direction_deg: number | null;

  @IsOptional()
  @Transform(({ value }) => (value === null ? null : Number(value)))
  @IsNumber()
  cloud_cover_percent: number | null;

  @IsOptional()
  @Transform(({ value }) => (value === null ? null : Number(value)))
  @IsNumber()
  precipitation_probability: number | null;

  @ValidateNested()
  @Type(() => CurrentWeatherDto)
  current_weather: CurrentWeatherDto;

  @ValidateNested()
  @Type(() => HourlyDto)
  hourly: HourlyDto;

  @ValidateNested()
  @Type(() => DailyDto)
  daily: DailyDto;
}
