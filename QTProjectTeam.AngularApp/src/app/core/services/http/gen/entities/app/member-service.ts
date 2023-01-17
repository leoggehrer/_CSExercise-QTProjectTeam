//@GeneratedCode
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBaseService } from '@app-core/services/api-base.service';
import { environment } from '@environment/environment';
import { Member } from '@app-core-models/gen/entities/app/member';
//@CustomImportBegin
//@CustomImportEnd
@Injectable({
  providedIn: 'root',
})
export class MemberService extends ApiBaseService<Member> {
  constructor(public override http: HttpClient) {
    super(http, environment.API_BASE_URL + '/members');
  }
//@CustomCodeBegin
//@CustomCodeEnd
}
