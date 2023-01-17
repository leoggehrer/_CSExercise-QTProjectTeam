import { Location } from '@angular/common';
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
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit, AfterViewInit {
  @ViewChild('password') public password: TextBoxComponent;
  @ViewChild('passwordRepeat') public passwordRepeat: TextBoxComponent;

  form!: FormGroup;

  loading = {
    action: false,
  };

  isWelcome: boolean = false;
  email: string;
  code: string; // needed for validation

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

  ngOnInit() {
    this.email = this.activatedRoute.snapshot.queryParams['email'];
    this.code = this.activatedRoute.snapshot.queryParams['code'];
    // this page is used as activating the account and for resetting the password
    this.isWelcome =
      this.activatedRoute.snapshot.queryParams['welcome'] != null ||
      this.router.url.indexOf('activate-account') > -1;
  }

  ngAfterViewInit(): void {
    this.password.input.nativeElement.type = 'password';
    this.passwordRepeat.input.nativeElement.type = 'password';
  }

  toggleVisibility(name: string): void {
    if (name === 'password') {
      const inputEl = this.password.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    } else if (name === 'passwordRepeat') {
      const inputEl = this.passwordRepeat.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    }
  }

  async setPassword() {
    try {
      this.loading.action = true;
      const password = this.form.get('password')?.value;
      const passwordRepeat = this.form.get('passwordRepeat')?.value;

      const result = await this.authService.setPassword(
        this.email,
        this.code,
        password
      );

      if (result) {
        // if success
        await this.userNotificationService.showInformationDialog({
          type: DefaultDialogTypes.Success,
          text: this.isWelcome
            ? 'Pages.SetPassword.Success.SetPassword.Text'
            : 'Pages.Welcome.Success.Activate.Text',
          title: this.isWelcome
            ? 'Pages.SetPassword.Success.SetPassword.Title'
            : 'Pages.Welcome.Success.Activate.Title',
          useTranslation: true,
        });

        this.form.reset();
        this.router.navigateByUrl('/');
      }
    } catch (e) {
      this.userNotificationService.showInformationDialog({
        type: DefaultDialogTypes.Error,
        text: this.isWelcome
          ? 'Pages.SetPassword.Errors.SetPassword.Text'
          : 'Pages.Welcome.Errors.Activate.Text',
        title: this.isWelcome
          ? 'Pages.SetPassword.Errors.SetPassword.Title'
          : 'Pages.Welcome.Errors.Activate.Title',
        useTranslation: true,
      });
    } finally {
      this.loading.action = false;
    }
  }

  private async initForm() {
    this.form = this.fb.group(
      {
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
