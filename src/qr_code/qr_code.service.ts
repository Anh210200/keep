import { Injectable } from '@nestjs/common';
import QRCode from 'qrcode';
@Injectable()
export class QrCodeService {
  getQrCode() {
    QRCode.toString('I am a pony!', { type: 'terminal' }, function (err, url) {
      console.log(url);
    });
  }
}
