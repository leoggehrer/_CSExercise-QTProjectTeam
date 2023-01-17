import { Observable } from 'rxjs';

import { IIdentifable } from './i-identifable';
import { IKey } from './i-key';

export interface IDataSourceService<T extends IKey> {
  getAllPaginated(queryString?: string): Observable<any>;
  getAll(queryString?: string): Observable<T[]>;
  getById(id: number): Observable<T>;
  create<T extends IIdentifable>(dataItem: T): Observable<T>;
  update<T extends IIdentifable>(dataItem: T): Observable<T>;
  delete(dataItem: IIdentifable): Observable<any>;
}
