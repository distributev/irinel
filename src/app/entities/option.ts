import { Injectable } from '@angular/core';

import { BaseRepository } from "../infra/repository/base-repository";

export class Option {

  constructor(
    public option_id: number,
    public option_name: string,
    public option_value: string,
    public autoload: string) { }

}

let mapBookshelfModel2Option = (model) => {
  return new Option(model.get('option_id'), model.get('option_name'), model.get('option_value'), model.get('autoload'));
}

@Injectable()
export class OptionsRepository extends BaseRepository<number, Option> {

  optionModel = this.bookshelf.Model.extend({
    tableName: 'options',
    hasTimestamps: true,
    idAttribute: 'option_id'
  });

  findAll(): Promise<Option[]> {

    return this.optionModel.forge().fetchAll().then(optionsModelCollection => {

      let options: Option[] = [];

      //bookshelfjs returned a bookshelfjs specific collection/Model datatype
      //we transform/return a Options[] javascript array easier to manipulate further
      optionsModelCollection.forEach(optionModel => {
        options.push(mapBookshelfModel2Option(optionModel));
      });

      return new Promise(function (resolve, reject) {
        resolve(options);
      });

    });

  }

  save(option: Option): Promise<Option> {

    return this.optionModel.forge(option).save()
      .then((savedModel) => {

        return new Promise(function (resolve, reject) {
          resolve(mapBookshelfModel2Option(savedModel));
        });

      })
      .catch((err) => console.error(err));

  }

}
