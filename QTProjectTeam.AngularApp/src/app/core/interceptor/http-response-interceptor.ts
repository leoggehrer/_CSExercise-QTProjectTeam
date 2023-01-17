import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((evt) => {
        if (evt instanceof HttpResponse) {
          console.log('event', evt);
          var bodyStr = JSON.stringify(evt.body);
          var body = this.retrocycle(evt.body); //parseRefs(bodyStr);

          console.log('body', body);

          var cl = evt.clone({ body: body });
          console.log('resp', cl);

          return cl;
        }

        return evt;
      })
    );
  }

  retrocycle(obj: any) {
    var catalog: any = [];
    this.findReferences(obj, catalog);
    return this.resolveReferences(obj, catalog);
  }

  findReferences(obj: any, catalog: any) {
    // The catalogObject function walks recursively through an object graph
    // looking for $id properties. When it finds an object with that property, then
    // it adds it to the catalog under that key.
    var i;
    if (obj && typeof obj === 'object') {
      var id = obj.$id;
      if (typeof id === 'string') {
        catalog[id] = obj;
      }
      if (Object.prototype.toString.apply(obj) === '[object Array]') {
        for (i = 0; i < obj.length; i += 1) {
          this.findReferences(obj[i], catalog);
        }
      } else {
        for (var n in obj) {
          if (obj.hasOwnProperty(n)) {
            if (typeof obj[n] === 'object') {
              this.findReferences(obj[n], catalog);
            }
          }
        }
      }
    }
  }

  resolveReferences(obj: any, catalog: any) {
    var i, item, name, id;
    if (obj && typeof obj === 'object') {
      if (Object.prototype.toString.apply(obj) === '[object Array]') {
        for (i = 0; i < obj.length; i += 1) {
          item = obj[i];
          if (item && typeof item === 'object') {
            id = item.$ref;
            if (typeof id === 'string') {
              obj[i] = catalog[id];
            } else {
              obj[i] = this.resolveReferences(item, catalog);
            }
          }
        }
      } else if (
        obj.$values &&
        Object.prototype.toString.apply(obj.$values) === '[object Array]'
      ) {
        var arr = new Array();
        for (i = 0; i < obj.$values.length; i += 1) {
          item = obj.$values[i];
          if (item && typeof item === 'object') {
            id = item.$ref;
            if (typeof id === 'string') {
              arr[i] = catalog[id];
            } else {
              arr[i] = this.resolveReferences(item, catalog);
            }
          } else {
            arr[i] = item;
          }
        }
        obj = arr;
      } else {
        for (name in obj) {
          if (obj.hasOwnProperty(name)) {
            if (typeof obj[name] === 'object') {
              item = obj[name];
              if (item) {
                id = item.$ref;
                if (typeof id === 'string') {
                  obj[name] = catalog[id];
                } else {
                  obj[name] = this.resolveReferences(item, catalog);
                }
              }
            }
          }
        }
      }
    }
    //removeAutoGenProperty(catalog);
    return obj;
  }

  removeAutoGenProperty(catalog: any) {
    for (var i = 0; i < catalog.length; i += 1) {
      var obj = catalog[i];
      if (obj && typeof obj === 'object') {
        var id = obj['$id'];
        if (typeof id != 'undefined') {
          delete obj['$id'];
        }
      }
    }
  }
}
