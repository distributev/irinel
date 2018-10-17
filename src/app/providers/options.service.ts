import { Injectable, OnInit } from '@angular/core';
import { OptionsRepository, Option } from '../entities/option';
import { Observable, from } from 'rxjs';

@Injectable()
export class OptionsService {

  options: Option[];

  constructor(private optionsRepository: OptionsRepository) { }

  async load() {

    if (!this.options)
      this.options = await this.optionsRepository.findAll();

  }

  get(option_name: string): Option {

    return this.options.find((option: Option) => {
      return (option.option_name == option_name);
    });

  }

  save(option: Option): Observable<Option> {

    return from(this.optionsRepository.save(option));

  }

}
