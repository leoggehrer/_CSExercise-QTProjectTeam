//@GeneratedCode
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@app-core/services/api-base.service';
import { environment } from '@environment/environment';
import { Project } from '@app-core-models/gen/entities/app/project';
//@CustomImportBegin
//@CustomImportEnd
@Injectable({
  providedIn: 'root',
})
export class ProjectService extends ApiBaseService<Project> {
  constructor(public override http: HttpClient) {
    super(http, environment.API_BASE_URL + '/projects');
  }
//@CustomCodeBegin
//@CustomCodeEnd
}
