import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, loginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Region } from 'src/region/entities/region.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Region.name) private regionModel: Model<Region>,
    private jwtService: JwtService,
  ) {}

  async findUser(email: string) {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(createUserDto: CreateUserDto) {
    let { email, password, region } = createUserDto;
    try {
      let user = await this.findUser(email);
      if (user) {
        throw new ConflictException('User already exists');
      }

      let hash = bcrypt.hashSync(password, 10);
      let newUser = await this.userModel.create({
        ...createUserDto,
        password: hash,
      });

      await this.regionModel.findByIdAndUpdate(region, {
        $push: { user: newUser._id },
      });

      return { data: newUser };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginUserDto: loginUserDto) {
    let { email, password } = loginUserDto;
    try {
      let user = await this.findUser(email);
      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }

      let isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        throw new BadRequestException('Password or email is wrong');
      }

      let token = this.jwtService.sign({ id: user._id, type: user.type });

      return { data: token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let all = await this.userModel.find().populate({path: "region", select: "-user"}).exec();;
      return  all ;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.userModel.findById(id).populate({ path: "region", select: '-user'}).exec();
      if (!data) {
        throw new NotFoundException('User not found');
      }
      return { data };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
      if (!updated) {
        throw new NotFoundException('User not found');
      }
      return { updated };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let data = await this.userModel.findByIdAndDelete(id);
      if (!data) {
        throw new NotFoundException('User not found');
      }
      return  data ;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
