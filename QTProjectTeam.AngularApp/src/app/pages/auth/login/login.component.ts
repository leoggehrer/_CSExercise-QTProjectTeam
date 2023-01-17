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
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('password') public textbox: TextBoxComponent;

  @Input()
  returnUrl?: string;

  form!: FormGroup;

  loading = {
    login: false,
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

  ngOnInit() {
    if (!this.returnUrl) {
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    }
  }

  ngAfterViewInit(): void {
    this.textbox.input.nativeElement.type = 'password';
  }

  toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
  }

  async login() {
    try {
      this.loading.login = true;
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      const user = await this.authService.login(email, password);

      if (user) {
        if (this.returnUrl) {
          this.router.navigate([this.returnUrl], { replaceUrl: true });
        } else {
          this.router.navigate(['/']);
        }
      }
    } catch (e) {
      this.userNotificationService.showInformationDialog({
        type: DefaultDialogTypes.Error,
        text: 'Pages.Login.Errors.LoginFailed.Text',
        title: 'Pages.Login.Errors.LoginFailed.Title',
        useTranslation: true,
      });
    } finally {
      this.loading.login = false;
    }
  }

  private async initForm() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(3)],
        //this.validatorService.isValidEmail,
      ],
      password: ['', [Validators.required]],
    });
  }
}
