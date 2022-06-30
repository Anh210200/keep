import { Controller, Get } from '@nestjs/common';
import { QrCodeService } from './qr_code.service';

@Controller('qr_code')
export class QrCodeController {
  constructor(private qrCodeService: QrCodeService) {}

  @Get()
  getQrCode() {
    return this.qrCodeService.getQrCode();
  }
}
