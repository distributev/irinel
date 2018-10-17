

import { Repository } from './repository';
import { ElectronService } from "../../providers/electron.service";
import { Injectable } from '@angular/core';
import { CryptingService } from '../../providers/crypting.service';

// that class only can be extended
@Injectable()
export abstract class BaseRepository<K, T> implements Repository<K, T> {

  public bookshelf;

  constructor(protected es: ElectronService, protected cryptingService: CryptingService) {

    this.bookshelf = es.bookshelf;

  };

  save(item: T): Promise<T> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  findById(id: K): Promise<T> {
    throw new Error("Method not implemented.");
  }

  findOne(query: any): Promise<T> {
    throw new Error("Method not implemented.");
  }

  deleteAll(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  deleteById(id: K): Promise<T> {
    throw new Error("Method not implemented.");
  }

  count(): Promise<number> {
    throw new Error("Method not implemented.");
  }

}
