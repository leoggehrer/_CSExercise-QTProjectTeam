//@GeneratedCode
import { IVersionEntity } from '@app-core-models/i-version-entity';
import { Member } from '@app-core-models/gen/entities/app/member';
//@CustomImportBegin
//@CustomImportEnd
export interface Project extends IVersionEntity {
  designation: string;
  description: string;
  members: Member[];
  id: number;
//@CustomCodeBegin
//@CustomCodeEnd
}
