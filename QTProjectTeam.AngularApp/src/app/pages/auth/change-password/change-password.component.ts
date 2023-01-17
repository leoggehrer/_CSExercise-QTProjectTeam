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
  UserNotificationService,
} from '@app-core-services/user-notification.service';
import { FormValidatorService } from '@app-core/helpers/form-validator.service';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  @ViewChild('oldPassword') public oldPassword: TextBoxComponent;
  @ViewChild('password') public password: TextBoxComponent;
  @ViewChild('passwordRepeat') public passwordRepeat: TextBoxComponent;

  form!: FormGroup;

  loading = {
    action: false,
  };

  constructor(
    private fb: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private formValidatorService: FormValidatorService,
    private userNotificationService: UserNotificationService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.oldPassword.input.nativeElement.type = 'password';
    this.password.input.nativeElement.type = 'password';
    this.passwordRepeat.input.nativeElement.type = 'password';
  }

  toggleVisibility(name: string): void {
    if (name === 'password') {
      const inputEl = this.password.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    } else if (name === 'oldPassword') {
      const inputEl = this.oldPassword.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    } else if (name === 'passwordRepeat') {
      const inputEl = this.passwordRepeat.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    }
  }

  async changePassword() {
    try {
      this.loading.action = true;
      const newPassword = this.form.get('password')?.value;
      const oldPassword = this.form.get('oldPassword')?.value;

      const result = await this.authService.changePassword(
        oldPassword,
        newPassword
      );

      if (result) {
        // if success
        await this.userNotificationService.showInformationDialog({
          type: DefaultDialogTypes.Success,
          text: 'Pages.ChangePassword.Success.ChangePassword.Text',
          title: 'Pages.ChangePassword.Success.ChangePassword.Title',
          useTranslation: true,
        });

        this.form.reset();
        this.router.navigateByUrl('/');
      }
    } catch (e) {
      this.userNotificationService.showInformationDialog({
        type: DefaultDialogTypes.Error,
        text: 'Pages.ChangePassword.Errors.ChangePassword.Text',
        title: 'Pages.ChangePassword.Errors.ChangePassword.Title',
        useTranslation: true,
      });
    } finally {
      this.loading.action = false;
    }
  }

  private async initForm() {
    this.form = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required]],
        passwordRepeat: ['', [Validators.required]],
      },
      {
        validator: this.formValidatorService.confirmPasswordValidator(
          'password',
          'passwordRepeat'
        ),
      }
    );
  }
}
