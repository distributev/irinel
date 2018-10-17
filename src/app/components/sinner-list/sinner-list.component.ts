import { Component, OnInit, OnDestroy } from '@angular/core';
import { SinnersService } from '../../providers/sinners.service';
import { Sinner } from '../../entities/sinner';
import { MessagesService } from '../../providers/messages.service';
import { OptionsService } from '../../providers/options.service';
import { CryptingService } from '../../providers/crypting.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UtilsService } from '../../providers/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sinner-list',
  templateUrl: './sinner-list.component.html',
  styleUrls: ['./sinner-list.component.scss']
})
export class SinnerListComponent implements OnInit {

  //sinners in the big list
  sinnersAll: Sinner[];
  sinnersVisibleOnCurrentPage: Sinner[];

  //pagination and sorting
  startItem: number = 0;
  endItem: number = 10;
  currentPage = -1;

  orderDirection: string = 'desc';

  //variables related with searching sinners by identifier
  searchSinnerIdentifier: string;
  foundSinnerIdentifier: string;

  foundSinners: Sinner[];
  prescriptionPeriod: number;

  //variables related with editing / deleting sinners
  stateEditSinnerNames: boolean[] = [];
  stateCheckSinnerNames: string[] = [];

  stateEditSinnerNotes: boolean[] = [];

  updatedSinnerNames: string[] = [];
  updatedSinnerNotes: string[] = [];

  constructor(private sinnersService: SinnersService, private router: Router, private messagesService: MessagesService, private optionsService: OptionsService, private cryptingService: CryptingService, private utilsService: UtilsService) { };

  async ngOnInit() {

    await this.optionsService.load();
    this.prescriptionPeriod = Number(this.optionsService.get('prescription_period').option_value);

    this.sinnersService.findAll()
      .subscribe(sinners => {

        this.sinnersAll = this.utilsService.sortByDate(sinners, "desc");

        if ((this.sinnersAll) && (this.sinnersAll.length > 10)) {
          this.sinnersVisibleOnCurrentPage = this.sinnersAll.slice(this.startItem, this.endItem);
          this.currentPage = 1;
        }
        else
          this.sinnersVisibleOnCurrentPage = this.sinnersAll;

      });

  }

  pageChanged(event: PageChangedEvent): void {

    this.startItem = (event.page - 1) * event.itemsPerPage;

    this.endItem = event.page * event.itemsPerPage;
    if (this.endItem > this.sinnersAll.length)
      this.endItem = this.sinnersAll.length;

    this.sinnersVisibleOnCurrentPage = this.sinnersAll.slice(this.startItem, this.endItem);

  }

  sort() {

    if (this.orderDirection == 'desc')
      this.orderDirection = 'asc';
    else
      this.orderDirection = 'desc';

    this.sinnersAll = this.utilsService.sortByDate(this.sinnersAll, this.orderDirection)

    if ((this.sinnersAll) && (this.sinnersAll.length > 10)) {

      this.currentPage = 1;
      this.startItem = 0;
      this.endItem = 10;

      this.sinnersVisibleOnCurrentPage = this.sinnersAll.slice(this.startItem, this.endItem);
    }
    else
      this.sinnersVisibleOnCurrentPage = this.sinnersAll;

  }

  searchSinnerHandler() {

    delete this.foundSinners;
    delete this.foundSinnerIdentifier;


    this.stateEditSinnerNames = [];
    this.stateCheckSinnerNames = [];

    this.stateEditSinnerNotes = [];

    if ((!this.searchSinnerIdentifier) || (this.searchSinnerIdentifier.length == 0)) return;

    this.sinnersService.findAllByIdentifier(this.searchSinnerIdentifier).subscribe((foundSins: Sinner[]) => {

      this.foundSinners = foundSins;

      if (foundSins.length) {
        this.foundSinnerIdentifier = this.searchSinnerIdentifier;
        this.messagesService.showInfo("A sinner was found. Here is what we have.");
      }
      else {
        this.foundSinnerIdentifier = 'notfound';
        this.messagesService.showWarning("No sinner was found.");
      }
    });

  }

  onKeydownHandler(event) {

    if (event.key === "Enter") {
      this.searchSinnerHandler();
    }

  }

  async checkSinnerNameHandler(index) {

    this.stateCheckSinnerNames[index] = 'no';

    let match = await this.cryptingService.compare(this.updatedSinnerNames[index], this.foundSinners[index].name);

    if (match) {
      this.stateCheckSinnerNames[index] = 'yes';
      this.messagesService.showInfo("Name is matched");
    } else
      this.messagesService.showWarning("Name not matched");

  }

  enterStateChangeSinnerName(index) {

    delete this.stateCheckSinnerNames[index];

    this.stateEditSinnerNames[index] = true;

  }

  async saveSinnerNameHandler(index, sinner) {

    sinner.name = await this.cryptingService.hash(this.updatedSinnerNames[index]);

    this.sinnersService.updateName(sinner.id, sinner.name)
      .subscribe(async data => {
        this.stateEditSinnerNames[index] = false;
        delete this.stateCheckSinnerNames[index];
        delete this.updatedSinnerNames[index];
        this.messagesService.showInfo("Name was saved");
      });

  }

  enterStateChangeSinnerNotes(index) {

    this.stateEditSinnerNotes[index] = true;

  }

  saveSinnerNotesHandler(index, sinner) {

    this.sinnersService.updateNotes(sinner.id, sinner.notes)
      .subscribe(async data => {
        this.stateEditSinnerNotes[index] = false;
        this.messagesService.showInfo("Notes saved");
      });

  }

  deleteSinnerHandler(index, sinner) {

    this.sinnersService.deleteById(sinner.id)
      .subscribe(async data => {
        await this.router.navigateByUrl('/refresh');
        await this.router.navigateByUrl('/sinner-list');
        this.messagesService.showInfo("You are so kind. Sin was forgiven.");
      });

  }


}
