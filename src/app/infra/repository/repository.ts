export interface Repository<K, T> {

  save(item: T): Promise<T>;

  findById(id: K): Promise<T>;

  findAll(query): Promise<T[]>;
  findAll(): Promise<T[]>;

  deleteAll(): Promise<boolean>;
  deleteById(id: K): Promise<T>;

  count(): Promise<number>;

}
