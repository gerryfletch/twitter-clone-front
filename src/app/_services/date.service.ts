import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  static prettyDate(timestamp: string): string{
    return moment(timestamp).fromNow();
  }

}
