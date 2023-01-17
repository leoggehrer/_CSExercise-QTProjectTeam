import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  constructor(private translateService: TranslateService) {}

  isValidEmail(control: FormControl) {
    return new Promise((resolve) => {
      const emailPattern =
        /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

      if (!emailPattern.test(control.value)) {
        resolve({ InvalidEmail: true });
      }
      resolve(null);
    });
  }

  isValidStreetWithNumber(control: FormControl) {
    return new Promise((resolve) => {
      const pattern = /\d/;

      if (!pattern.test(control.value)) {
        resolve({ InvalidEmail: true });
      }
      resolve(null);
    });
  }

  isValidInteger(control: FormControl) {
    return new Promise((resolve) => {
      const pattern = /^\d+$/;

      if (!pattern.test(control.value)) {
        resolve({ InvalidEmail: true });
      }
      resolve(null);
    });
  }

  getFormValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
    let errors: AllValidationErrors[] = [];
    Object.keys(controls).forEach((key) => {
      const control = controls[key];
      if (control instanceof FormGroup) {
        errors = errors.concat(this.getFormValidationErrors(control.controls));
      }
      const controlErrors: ValidationErrors = controls[key].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[keyError],
          });
        });
      }
    });
    return errors;
  }

  createErrorMessage(
    errors: AllValidationErrors[],
    translationPrefix: string = null
  ) {
    const result: string[] = [];

    errors.forEach((error) => {
      if (translationPrefix) {
        const translationKey = translationPrefix + error.control_name;
        result.push(this.translateService.instant(translationKey));
      }
    });

    return result.join('<br/>');
  }

  confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmPasswordValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}
