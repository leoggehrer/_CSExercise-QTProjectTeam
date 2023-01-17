import { HttpClient } from '@angular/common/http';
import { IDataSourceService } from '@app-core-models/i-data-source-service';
import { IIdentifable } from '@app-core-models/i-identifable';
import { arrayToDate, stringToDate } from '@app-core/converter/date-converter';
import { toDataSourceRequestString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//https://www.telerik.com/kendo-angular-ui/components/data-query/mvc-integration/

export abstract class ApiBaseService<T extends IIdentifable>
  implements IDataSourceService<T>
{
  constructor(public http: HttpClient, protected ENDPOINT_URL: string) {}

  public getAllPaginated(queryString = ''): Observable<any> {
    //var queryStr = state ? `?${toDataSourceRequestString(state)}`: '';

    if (queryString) {
      queryString = '?' + queryString;
    }

    return this.http.get(`${this.ENDPOINT_URL}/paginated${queryString}`).pipe(
      map(({ data, total, aggregateResults }: any): any => {
        arrayToDate(data);
        return {
          data: data,
          total: total,
          aggregateResults: aggregateResults,
        };
      })
    );
  }

  public getAllPaginatedByState(state: any): Observable<any> {
    var queryStr = `?${toDataSourceRequestString(state)}`;
    return this.getAllPaginated(queryStr);
  }

  public getAll(queryString = ''): Observable<T[]> {
    if (queryString) {
      queryString = '?' + queryString;
    }

    return this.http.get<T[]>(`${this.ENDPOINT_URL}${queryString}`).pipe(
      map((response: T[]) => {
        arrayToDate(response);
        return response;
      })
    );
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.ENDPOINT_URL}/${id}`).pipe(
      map((response: T) => {
        stringToDate(response);
        return response;
      })
    );
  }

  /**
   * Get all of generic type
   */
  public getAllBySubUrl(suburl: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.ENDPOINT_URL}/${suburl}`).pipe(
      map((response: T[]) => {
        arrayToDate(response);
        return response;
      })
    );
  }

  /**
   * Get all of releated with other type
   */
  public getAllRelatedBySubUrl<K>(suburl: string): Observable<K[]> {
    return this.http.get<K[]>(`${this.ENDPOINT_URL}/${suburl}`).pipe(
      map((response: K[]) => {
        arrayToDate(response);
        return response;
      })
    );
  }

  public getByPredicate<T>(query: string, includes?: string): Observable<T[]> {
    if (includes) {
      return this.http
        .get<T[]>(`${this.ENDPOINT_URL}/includes/${includes}/query/${query}`)
        .pipe(
          map((response: T[]) => {
            arrayToDate(response);
            return response;
          })
        );
    } else {
      return this.http.get<T[]>(`${this.ENDPOINT_URL}/query/${query}`).pipe(
        map((response: T[]) => {
          arrayToDate(response);
          return response;
        })
      );
    }
  }

  public getAllRelatedBySubUrlPaginated(
    suburl: string,
    state = null
  ): Observable<any> {
    var queryStr = '';
    if (state) {
      queryStr = `?${toDataSourceRequestString(state)}`;
    }

    return this.http.get(`${this.ENDPOINT_URL}/${suburl}${queryStr}`).pipe(
      map(({ data, total, aggregateResults }: any): any => {
        arrayToDate(data);
        return {
          data: data,
          total: total,
          aggregateResults: aggregateResults,
        };
      })
    );
  }

  public create<T extends IIdentifable>(dataItem: T): Observable<T> {
    console.log('create', dataItem);
    return this.http.post<T>(`${this.ENDPOINT_URL}`, dataItem).pipe(
      map((response: T) => {
        stringToDate(response);
        return response;
      })
    );
  }

  public update<T extends IIdentifable>(dataItem: T): Observable<T> {
    console.log('update', dataItem);

    return this.http
      .put<T>(`${this.ENDPOINT_URL}/${dataItem.id}`, dataItem)
      .pipe(
        map((response: T) => {
          stringToDate(response);
          return response;
        })
      );
  }

  public delete(dataItem: IIdentifable) {
    const options = {
      headers: {},
      body: dataItem,
    };

    return this.http.delete(`${this.ENDPOINT_URL}/${dataItem.id}`, options);
  }
}
