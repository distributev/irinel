import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CryptingService {

  private SALT = 10;

  hash(text: string): Promise<string> {

    return bcrypt.hash(text, this.SALT);

  }

  compare(text: string, hashText: string): Promise<boolean> {

    return bcrypt.compare(text, hashText);

  }

}
