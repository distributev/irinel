import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Sinner } from '../entities/sinner';

@Injectable()
export class UtilsService {

  sortByDate(sinners: Sinner[], order: string): Sinner[] {

    return sinners.sort((sin1: Sinner, sin2: Sinner) => {

      var date1, date2;

      if (order == 'asc') {
        date1 = moment(sin1.sinDate, 'LL');
        date2 = moment(sin2.sinDate, 'LL');
      }
      else {
        date1 = moment(sin2.sinDate, 'LL');
        date2 = moment(sin1.sinDate, 'LL');
      }

      if (date1.isBefore(date2))
        return -1;
      else if (date1.isAfter(date2))
        return 1;
      else
        return 0;

    });

  }

}
