import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather {
  @Prop({ required: true })
  source: string;

  @Prop({
    type: {
      city: { type: String, required: false },
      latitude: Number,
      longitude: Number,
    },
  })
  location: {
    city?: string | null;
    latitude: number;
    longitude: number;
  };

  @Prop({ type: Date, required: true })
  observed_at: Date;

  // ------------- CURRENT ----------------
  @Prop({
    type: {
      time: String,
      temp: Number,
      windspeed: Number,
      winddirection: Number,
      humidity: Number,
      cloud: Number,
      rain: Number,
    },
  })
  current: {
    time: string;
    temp: number;
    windspeed: number;
    winddirection: number;
    humidity: number | null;
    cloud: number | null;
    rain: number | null;
  };

  // ------------- HOURLY FORECAST ----------------
  @Prop([
    {
      time: String,
      temp: Number,
      humidity: Number,
      cloud: Number,
      rain: Number,
    },
  ])
  forecast_hourly: Array<{
    time: string;
    temp: number;
    humidity: number;
    cloud: number;
    rain: number;
  }>;

  // ------------- DAILY FORECAST ----------------
  @Prop([
    {
      date: String,
      min: Number,
      max: Number,
    },
  ])
  forecast_daily: Array<{
    date: string;
    min: number;
    max: number;
  }>;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
