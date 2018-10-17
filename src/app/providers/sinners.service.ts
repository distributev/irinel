import { Injectable } from "@angular/core";
import { SinnersRepository, Sinner } from "../entities/sinner";
import { Observable, from } from 'rxjs';

@Injectable()
export class SinnersService {

  constructor(private sinnersRepository: SinnersRepository) { }

  updateName(key: number, value: string): Observable<number> {
    return from(this.sinnersRepository.updateName(key, value));
  }

  updateNotes(key: number, value: string): Observable<number> {
    return from(this.sinnersRepository.updateNotes(key, value));
  }

  findOne(query: any): Observable<Sinner> {

    return from(this.sinnersRepository.findOne(query));

  }

  findAll(): Observable<Sinner[]> {

    return from(this.sinnersRepository.findAll());

  }

  findAllByIdentifier(identifier: string): Observable<Sinner[]> {

    return from(this.sinnersRepository.findAllByIdentifier(identifier));

  }

  findAllPrescripted(prescriptionPeriod: number): Observable<Sinner[]> {

    return from(this.sinnersRepository.findAllPrescripted(prescriptionPeriod));

  }

  deleteById(id: number): Observable<Sinner> {

    return from(this.sinnersRepository.deleteById(id));

  }

  deleteAllPrescripted(prescriptionPeriod: number): Observable<Sinner>[] {

    let deletedSinners: Observable<Sinner>[] = [];

    this.sinnersRepository.findAllPrescripted(prescriptionPeriod).then(presriptedSinners => {

      presriptedSinners.forEach((sinner: Sinner) => { deletedSinners.push(from(this.sinnersRepository.deleteById(sinner.id))); });

    })

    return deletedSinners;

  }

  save(sinner: Sinner): Observable<Sinner> {

    return from(this.sinnersRepository.save(sinner));

  }

}
