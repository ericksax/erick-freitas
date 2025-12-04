import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  // Endpoint que o worker Go vai chamar
  @Post('logs')
  async createLog(@Body() dto: CreateWeatherDto) {
    const result = await this.weatherService.create(dto);
    return { message: 'Log created successfully', success: true, data: result };
  }

  // Endpoint para o frontend listar registros
  @Get('logs')
  async getLogs() {
    const data = await this.weatherService.findAll();
    return {
      message: 'Logs retrieved successfully',
      success: true,
      data,
    };
  }

  @Get('last')
  async getLast() {
    const data = await this.weatherService.findLastOne();
    return {
      message: 'Last log retrieved successfully',
      success: true,
      data,
    };
  }

  @Get('insights')
  async insights() {
    return await this.weatherService.generateInsights();
  }
}
