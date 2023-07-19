import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Login } from './login';
import { LoginService } from './service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form!: FormGroup;
  public typeInput!: boolean;
  private $login!: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private toastService: ToastService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    const { _csrf } = this.activatedRoute.snapshot.data['login'];
    this.form = this.fb.group({
      email: ['analucia@hotmail.com', [Validators.required, Validators.email]],
      password: [
        'zaq1234XSW@#$',
        [Validators.required, Validators.max(18), Validators.min(8)],
      ],
      stayConnected: [''],
      _csrf,
    });
  }

  public get controls(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.form.controls;
  }

  public passwordVisible(): void {
    this.typeInput = !this.typeInput;
  }

  public onSubmit() {
    this.$login = this.loginService.setLogin(this.form.value).subscribe({
      next: (login: Login) => {
        if (login) {
          console.log(JSON.stringify(login));
          this.toastService.show(
            'Login efetuado com sucesso.',
            'bottom',
            'thumbs-up',
            3000
          );
        }
      },
      error: ({ error }: HttpErrorResponse) =>
        this.alertService.alert('Atenção', error.message),
      complete: () => setTimeout(() => this.$login.unsubscribe(), 2000),
    });
  }
}
