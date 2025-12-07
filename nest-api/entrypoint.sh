#!/bin/sh

echo "⏳ Rodando seeder..."
npm run seed

echo "🚀 Iniciando NestJS..."
npm run start:prod
