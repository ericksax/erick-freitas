import { Put, Controller, Param, Body, Delete, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
  constructor(private useService: UsersService) {}

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto) {
    return this.useService.updateUser(id, userUpdateDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.useService.deleteUser(id);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.useService.findById(id);
  }
  @Get()
  getUsers() {
    return this.useService.findAll();
  }
}
