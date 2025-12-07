import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from 'src/users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const user = {
    email: 'admin@mail.com',
    password: '123456',
    name: 'admin',
  };

  const foundedUser = await usersService.findByEmail(user.email);

  if (foundedUser) {
    console.log('User already exists');
    return;
  }

  await usersService.createUser(user);

  await app.close();
}

void bootstrap();
