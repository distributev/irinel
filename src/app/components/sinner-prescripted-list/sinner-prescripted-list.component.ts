import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SinnersService } from '../../providers/sinners.service';
import { Sinner } from '../../entities/sinner';
import { Observable, Subject, forkJoin } from 'rxjs';
import { OptionsService } from '../../providers/options.service';
import { MessagesService } from '../../providers/messages.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UtilsService } from '../../providers/utils.service';


@Component({
  selector: 'app-sinner-prescripted-list',
  templateUrl: './sinner-prescripted-list.component.html',
  styleUrls: ['./sinner-prescripted-list.component.scss']
})
export class SinnerPrescriptedListComponent implements OnInit {

  prescriptedSinnersAll: Sinner[];
  prescriptedSinnersVisibleOnCurrentPage: Sinner[];

  //pagination and sorting
  startItem: number = 0;
  endItem: number = 10;
  currentPage = -1;

  orderDirection: string = 'desc';

  prescriptionPeriod: number;

  constructor(private sinnersService: SinnersService, private messagesService: MessagesService, private optionsService: OptionsService, private utilsService: UtilsService) { };
  async ngOnInit() {

    await this.optionsService.load();
    this.prescriptionPeriod = Number(this.optionsService.get('prescription_period').option_value);

    this.sinnersService.findAllPrescripted(this.prescriptionPeriod)
      .subscribe(prescriptedSinners => {

        this.prescriptedSinnersAll = this.utilsService.sortByDate(prescriptedSinners, "desc");

        if ((this.prescriptedSinnersAll) && (this.prescriptedSinnersAll.length > 10)) {

          this.prescriptedSinnersVisibleOnCurrentPage = this.prescriptedSinnersAll.slice(this.startItem, this.endItem);
          this.currentPage = 1;

        }
        else
          this.prescriptedSinnersVisibleOnCurrentPage = this.prescriptedSinnersAll;


      });

  }

  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.prescriptedSinnersVisibleOnCurrentPage = this.prescriptedSinnersAll.slice(this.startItem, this.endItem);
  }

  sort() {

    if (this.orderDirection == 'desc')
      this.orderDirection = 'asc';
    else
      this.orderDirection = 'desc';

    this.prescriptedSinnersAll = this.utilsService.sortByDate(this.prescriptedSinnersAll, this.orderDirection)

    if ((this.prescriptedSinnersAll) && (this.prescriptedSinnersAll.length > 10)) {

      this.currentPage = 1;
      this.startItem = 0;
      this.endItem = 10;

      this.prescriptedSinnersVisibleOnCurrentPage = this.prescriptedSinnersAll.slice(this.startItem, this.endItem);
    }
    else
      this.prescriptedSinnersVisibleOnCurrentPage = this.prescriptedSinnersAll;

  }

  async giveAmnesty() {

    await this.sinnersService.deleteAllPrescripted(this.prescriptionPeriod);

    await this.messagesService.showInfo('All prescripted sinners were forgiven (and forgotten)');

    this.prescriptedSinnersAll = [];
    this.prescriptedSinnersVisibleOnCurrentPage = [];

  };

}



