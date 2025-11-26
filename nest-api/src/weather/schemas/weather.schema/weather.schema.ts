import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema({ timestamps: true })
export class Weather {
  @Prop({ required: true })
  source: string;

  @Prop({ type: Object, required: true })
  location: {
    city?: string;
    latitude: number;
    longitude: number;
  };

  @Prop({ required: true })
  observed_at: Date;

  @Prop()
  temperature_c?: number;

  @Prop()
  humidity_percent?: number;

  @Prop()
  wind_speed_m_s?: number;

  @Prop()
  wind_direction_deg?: number;

  @Prop()
  cloud_cover_percent?: number;

  @Prop()
  precipitation_probability?: number;

  @Prop({ type: Object })
  raw?: Record<string, any>;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
