import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app-core-services/auth.service';
import {
  DefaultDialogTypes,
  InfoDialogOptions,
  UserNotificationService,
} from '@app-core-services/user-notification.service';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  form!: FormGroup;

  loading = {
    action: false,
  };

  constructor(
    private fb: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private userNotificationService: UserNotificationService
  ) {
    this.initForm();
  }

  async requestPassword() {
    try {
      this.loading.action = true;
      const email = this.form.get('email')?.value;

      const result = await this.authService.requestPassword(email);

      if (result) {
        // if success
        await this.userNotificationService.showInformationDialog({
          type: DefaultDialogTypes.Success,
          text: 'Pages.ForgotPassword.Success.RequestPassword.Text',
          title: 'Pages.ForgotPassword.Success.RequestPassword.Title',
          useTranslation: true,
        });

        this.form.reset();
        this.router.navigateByUrl('/');
      }
    } catch (e) {
      this.userNotificationService.showInformationDialog({
        type: DefaultDialogTypes.Error,
        text: 'Pages.ForgotPassword.Errors.RequestPassword.Text',
        title: 'Pages.ForgotPassword.Errors.RequestPassword.Title',
        useTranslation: true,
      });
    } finally {
      this.loading.action = false;
    }
  }

  private async initForm() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(3)],
        //this.validatorService.isValidEmail,
      ],
    });
  }
}
