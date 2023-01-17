//@GeneratedCode
import { IVersionEntity } from '@app-core-models/i-version-entity';
import { Project } from '@app-core-models/gen/entities/app/project';
//@CustomImportBegin
//@CustomImportEnd
export interface Member extends IVersionEntity {
  name: string;
  responsibilities: string;
  projects: Project[];
  id: number;
//@CustomCodeBegin
//@CustomCodeEnd
}
