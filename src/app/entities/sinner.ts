import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { BaseRepository } from "../infra/repository/base-repository";

export class Sinner {

  constructor(
    public id: number,
    public identifier: string,
    public name: string,
    public notes: string,
    public sinDate: Date) { };

  timeElapsed() {

    let sinDate = moment(this.sinDate, 'LL');
    return sinDate.fromNow();

  }

  isPrescripted(prescriptionPeriod: number): boolean {

    let diffDays = moment().diff(this.sinDate, 'days');

    if (diffDays > prescriptionPeriod * 365)
      return true;

    return false;

  }

  prescripted(prescriptionPeriod: number): string {

    if (this.isPrescripted(prescriptionPeriod))
      return 'Yes';

    return 'No';

  }

}

let mapBookshelfModel2Sinner = (model) => {
  return new Sinner(model.get('id'), model.get('identifier'), model.get('name'), model.get('notes'), model.get('sinDate'));
}

@Injectable()
export class SinnersRepository extends BaseRepository<number, Sinner> {

  sinnerModel = this.bookshelf.Model.extend({

    tableName: 'sinners',
    hasTimestamps: true

  });

  updateName(key: number, value: string): Promise<number> {

    return this.bookshelf.knex('sinners')
      .where({ id: key })
      .update({ name: value });

  }

  updateNotes(key: number, value: string): Promise<number> {

    return this.bookshelf.knex('sinners')
      .where({ id: key })
      .update({ notes: value });

  }

  findAllByIdentifier(identifier: string): Promise<Sinner[]> {

    let sinners: Sinner[] = [];

    return this.sinnerModel.forge().fetchAll().then(sinnersModelCollection => {

      const allMatchesPromises = [];
      sinnersModelCollection.forEach((sinnerModel) => {

        let hashedIdentifier = sinnerModel.get('identifier');

        const matchedPromise = this.cryptingService.compare(identifier, hashedIdentifier).then(matched => {

          if (matched)
            sinners.push(mapBookshelfModel2Sinner(sinnerModel));

        });

        allMatchesPromises.push(matchedPromise);

      });

      return Promise.all(allMatchesPromises).then(() => {

        return new Promise(function (resolve, reject) {

          resolve(sinners);

        });

      });

    });

  }

  findAll(): Promise<Sinner[]> {

    return this.sinnerModel.forge().fetchAll().then(sinnersModelCollection => {

      let sinners: Sinner[] = [];

      //bookshelfjs returned collection/Model datatypes are not compatible with Angular
      //so we transform/return a Sinner[] javascript array which Angular can display
      sinnersModelCollection.forEach(sinnerModel => {
        sinners.push(mapBookshelfModel2Sinner(sinnerModel));
      });

      return new Promise(function (resolve, reject) {
        resolve(sinners);
      });

    });

  }

  findAllPrescripted(prescriptionPeriod: number): Promise<Sinner[]> {

    return this.findAll().then(allSinners => {

      let prescriptedSinners: Sinner[] = allSinners.filter((sinner: Sinner) => sinner.isPrescripted(prescriptionPeriod));

      return new Promise<Sinner[]>(function (resolve, reject) {
        resolve(prescriptedSinners);
      });

    });

  }

  deleteById(id: number): Promise<Sinner> {

    return this.sinnerModel.forge({ [this.sinnerModel.prototype.idAttribute]: id })
      .destroy().then((destroyedModel) => {

        return new Promise(function (resolve, reject) {
          resolve(mapBookshelfModel2Sinner(destroyedModel));
        });

      })

  }

  deleteAll(): Promise<boolean> {

    return this.bookshelf.knex('sinners').truncate();

  }

  async save(sinner: Sinner): Promise<Sinner> {

    //if it's new crypt the data, otherwise no (it's already crypted)
    if (!sinner.id) {

      sinner.identifier = await this.cryptingService.hash(sinner.identifier);
      sinner.name = await this.cryptingService.hash(sinner.name);

    }

    return this.sinnerModel.forge(sinner).save()
      .then((savedModel) => {

        return new Promise(function (resolve, reject) {
          resolve(mapBookshelfModel2Sinner(savedModel));
        });

      })
      .catch((err) => console.error(err));

  }

}
