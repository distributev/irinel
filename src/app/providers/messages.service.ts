import { Injectable } from '@angular/core';

import * as toastr from "toastr";

@Injectable()
export class MessagesService {

  showInfo(message: string) {
    toastr.info(message);
  }

  showError(message: string) {
    toastr.error(message);
  }

  showWarning(message: string) {
    toastr.warning(message);
  }
}
