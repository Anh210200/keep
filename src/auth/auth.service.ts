import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDTO) {
    try {
      // generate password
      const hash = await argon2.hash(dto.password);
      // save new user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      return this.signToken({ userId: user.id, email: user.email });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('email-already-in-used');
        }
      }
    }
  }

  async signin(dto: AuthDTO) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user not exist throw exception
    if (!user) {
      throw new ForbiddenException('invalid-email-or-password');
    }
    console.log(user.password);
    // compare password
    const pwIsCorrect = await argon2.verify(user.password.trim(), dto.password);
    // if user exist but wrong password
    if (!pwIsCorrect) {
      throw new ForbiddenException('invalid-email-or-password');
    }
    return this.signToken({ userId: user.id, email: user.email });
  }

  async signToken({
    userId,
    email,
  }: {
    userId: number;
    email: string;
  }): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const expiresIn = this.config.get('JWT_EXPIRES_IN');
    const token = await this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });

    return {
      access_token: token,
    };
  }
}
