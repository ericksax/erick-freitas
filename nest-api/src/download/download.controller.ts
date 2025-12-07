import { Controller, Get, Res } from '@nestjs/common';
import { DownloadService } from './download.service';
import express from 'express';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('xlsx')
  async downloadXlsx(@Res() res: express.Response) {
    const buffer = await this.downloadService.generateXlsx();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=weather-data.xlsx',
    );
    res.send(buffer);
  }

  @Get('csv')
  async downloadCsv(@Res() res: express.Response) {
    const csv = await this.downloadService.generateCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=weather-data.csv',
    );
    res.send(csv);
  }
}
