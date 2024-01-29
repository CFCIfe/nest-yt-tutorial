import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Maggie Bass',
      email: 'ras@ajzuraz.eh',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Bernice Hamilton',
      email: 'bakufcak@ime.et',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Emily Burke',
      email: 'nigut@joltum.gov',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Chase Moran',
      email: 'lon@zu.gh',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if(rolesArray.length === 0) throw new NotFoundException("User's Role not found")
      return rolesArray
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if(!user) throw new NotFoundException('User Not Found')
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDTO: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDTO };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
