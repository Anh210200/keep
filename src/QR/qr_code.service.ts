import { Injectable, StreamableFile } from '@nestjs/common';
import * as qrcode from 'qrcode';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QrCodeService {
  constructor(private prisma: PrismaService) { }
  // @Cron(CronExpression.EVERY_30_SECONDS)
  async getQrCode() {
    const value = uuidv4();
    await this.prisma.qrCode.deleteMany();
    await this.prisma.qrCode.create({
      data: {
        id: value,
      },
    });
    const graphics = await qrcode.toString(value, {
      type: 'svg',
      width: 500,
      errorCorrectionLevel: 'low',

    });
    return graphics;
  }
}
