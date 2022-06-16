import { Injectable, StreamableFile } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { createReadStream } from 'fs';
import { Stream } from 'node:stream';
import { join } from 'path';
import * as qrcode from 'qrcode';
import { PassThrough } from 'stream';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class QrCodeService {
  // @Cron(CronExpression.EVERY_30_SECONDS)
  async getQrCode() {
    // const qrStream = new PassThrough();

    // const result = await qrcode.toFileStream(qrStream, 'hahahaha', {
    //   type: 'png',
    //   width: 200,
    //   errorCorrectionLevel: 'low',
    // });
    // qrStream.pipe(result);
    const graphics = await qrcode.toString(uuidv4(), {
      type: 'svg',
      width: 300,
      errorCorrectionLevel: 'low',
      // margin:,
    });
    console.log(graphics);
    return graphics;
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async cronTest() {
  //   const graphics = await qrcode.toString(uuidv4(), {
  //     type: 'utf8',
  //   });
  //   console.log(graphics);
  // }
}
