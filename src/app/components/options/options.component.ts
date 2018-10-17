import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../../providers/options.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MessagesService } from '../../providers/messages.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  prescriptionPeriod: string;
  optionsChanged: Subject<string> = new Subject<string>();

  constructor(private optionsService: OptionsService, private messagesService: MessagesService) {

    // wait 300ms after the last event before emitting last event
    this.optionsChanged.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(async newPrescriptionPeriod => {

        if (newPrescriptionPeriod) {

          this.prescriptionPeriod = newPrescriptionPeriod;

          let option = this.optionsService.get('prescription_period');
          option.option_value = newPrescriptionPeriod;
          await optionsService.save(option);

          this.messagesService.showInfo("Options saved");

        }

      });

  };

  optionsChangedEventHandler(newOptionValue: string) {
    this.optionsChanged.next(newOptionValue);
  }

  async ngOnInit() {

    await this.optionsService.load();
    this.prescriptionPeriod = this.optionsService.get('prescription_period').option_value;

  }

}
