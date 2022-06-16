import { Injectable, StreamableFile } from '@nestjs/common';
import * as qrcode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class QrCodeService {
  // @Cron(CronExpression.EVERY_30_SECONDS)
  async getQrCode() {
    const graphics = await qrcode.toString(uuidv4(), {
      type: 'svg',
      width: 400,
      errorCorrectionLevel: 'low',
      // margin:,
    });
    console.log(graphics);
    return graphics;
  }
}
