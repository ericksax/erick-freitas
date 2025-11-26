import {
  IsString,
  IsNumber,
  IsOptional,
  IsObject,
  IsDateString,
} from 'class-validator';

export class CreateWeatherDto {
  @IsString()
  source: string;

  @IsObject()
  location: {
    city?: string;
    latitude: number;
    longitude: number;
  };

  @IsDateString()
  observed_at: string;

  @IsNumber()
  @IsOptional()
  temperature_c?: number;

  @IsNumber()
  @IsOptional()
  humidity_percent?: number;

  @IsNumber()
  @IsOptional()
  wind_speed_m_s?: number;

  @IsNumber()
  @IsOptional()
  wind_direction_deg?: number;

  @IsNumber()
  @IsOptional()
  cloud_cover_percent?: number;

  @IsNumber()
  @IsOptional()
  precipitation_probability?: number;

  @IsObject()
  @IsOptional()
  raw?: Record<string, any>;
}
