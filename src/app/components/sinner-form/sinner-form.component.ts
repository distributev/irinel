import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SinnersService } from '../../providers/sinners.service';
import { Router } from '@angular/router';
import { MessagesService } from '../../providers/messages.service';

@Component({
  selector: 'app-sinner-form',
  template: '<button type="button" id="btnNewSin" class="btn btn-block btn-primary" (click)="openModalWithComponent()">New Sin&nbsp;&nbsp;<i class="fa fa-free-code-camp"></i></button>'
})
export class SinnerFormComponent {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Add New'
    };
    this.bsModalRef = this.modalService.show(SinnerFormContentComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}

/* This is a component which we pass in modal*/

@Component({
  selector: 'modal-content',
  templateUrl: './sinner-form.component.html'
})
export class SinnerFormContentComponent implements OnInit {

  bsValue = new Date();
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  sinnerForm = this.fb.group({
    identifier: ['', Validators.required],
    name: [''],
    notes: ['', Validators.required],
    sinDate: [moment(new Date()).format('LL'), Validators.required]
  });

  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private sinnersService: SinnersService, private router: Router, private messagesService: MessagesService) {

    this.dpConfig.containerClass = 'theme-default';
    this.dpConfig.dateInputFormat = 'LL';

  }

  ngOnInit() {


  }

  onSubmit() {

    let sinDate = moment(this.sinnerForm.controls['sinDate'].value);

    let formattedSinDate = sinDate.format(this.dpConfig.dateInputFormat);

    this.sinnerForm.controls['sinDate'].setValue(formattedSinDate);

    this.sinnersService.save(this.sinnerForm.value)
      .subscribe(async data => {
        await this.router.navigateByUrl('/refresh');
        await this.router.navigateByUrl('/sinner-list');
        await this.bsModalRef.hide();
        await this.messagesService.showInfo('Sinner was saved to hell');
      }
      );
  }

  /*
  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  */

}
