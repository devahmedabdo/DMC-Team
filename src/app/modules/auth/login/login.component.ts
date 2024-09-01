import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';

import { DmcService } from 'src/app/services/dmc.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  status: string = 'login';
  token: any = null;
  formType: string = 'login';
  signupStep: number = 0;
  type: string = 'password';
  loading: any = {
    form: false,
    page: true,
  };
  form: any = {
    errors: null,
    message: null,
  };

  loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: [localStorage.getItem('password') || '', [Validators.required]],
    rememberMe: [false],
  });
  signupForm = this.fb.group({
    fNameAr: ['', [Validators.required]],
    fNameEn: ['', [Validators.required]],
    lNameAr: ['', [Validators.required]],
    lNameEn: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    committee: [null, [Validators.required]],
    whatsapp: [''],
    twitter: [''],
    facebook: [''],
    instagram: [''],
    joinDate: ['', [Validators.required]],
    showImg: [false],
    card: [false],
  });
  consvoys: any[] = [];
  committees: any[] = [];
  selectedConvoys: string[] = [];
  userImgBox: boolean = false;
  userImgBoxReady: boolean = false;
  acceptSignup: boolean = false;
  userImg: any;
  userImgCropped: any;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private dmc: DmcService,
    private activatedRoute: ActivatedRoute
  ) {
    this.token = this.activatedRoute.snapshot.params['token'];
    if (this.token) this.status = 'reset';
    this.subscriptions.push(
      this.api.get('config').subscribe({
        next: (data: any) => {
          this.loading.page = false;
          this.acceptSignup = data.config.acceptSignup;
        },
        error: (error: any) => {
          this.loading.page = false;
          this.dmc.message('حدث خطأ', 'error');
        },
      })
    );
  }

  ngOnInit(): void {
    this.formType = this.router.url.replace('/', '');
    if (this.formType == 'signup') this.getSelect();
  }
  saveData(data: any) {
    if (data.rememberMe) {
      localStorage.setItem('password', data.password);
      localStorage.setItem('email', data.email);
    }
  }
  reset() {
    this.form = {
      errors: null,
      message: null,
    };
  }
  selectChange(event: any, id: string) {
    if (event.checked) {
      this.selectedConvoys.push(id);
    } else {
      this.selectedConvoys.splice(this.selectedConvoys.indexOf(id), 1);
    }
  }
  login(data: any) {
    this.reset();
    this.loading.form = true;
    this.subscriptions.push(
      this.api.post('member/login', data).subscribe({
        next: (data: any) => {
          console.log(data);
          this.loading.form = false;
          this.dmc.setItem('auth', data);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log(err);
          this.loading.form = false;
          this.form.message = err.error || err.message;
        },
      })
    );
  }
  sendToken(data: any) {
    this.reset();
    this.loading.form = true;
    this.subscriptions.push(
      this.api.post('member/reset-password', data).subscribe({
        next: (token: any) => {
          this.loading.form = false;
          this.status = 'sendTokenSuccess';
        },
        error: (err) => {
          console.log(err);
          this.loading.form = false;
          this.form.message = err.error;
        },
      })
    );
  }
  resetPass(data: any) {
    this.reset();
    this.loading.form = true;
    this.subscriptions.push(
      this.api.post('member/change-password/' + this.token, data).subscribe({
        next: (token: any) => {
          this.loading.form = false;
          this.status = 'resetSuccess';
        },
        error: (err) => {
          console.log(err);
          this.loading.form = false;
          this.form.message = err.error;
        },
      })
    );
  }
  signup(data: any) {
    this.form = {
      errors: null,
      message: null,
    };
    let postData = {
      name: {
        first: {
          ar: data.fNameAr,
          en: data.fNameEn,
        },
        last: {
          ar: data.lNameAr,
          en: data.lNameEn,
        },
      },
      socialAccounts: {
        facebook: data.facebook,

        whatsapp: data.whatsapp,

        twitter: data.twitter,

        instagram: data.instagram,
      },
      joinDate: data.joinDate,
      password: data.password,
      committee: data.committee,
      email: data.email,
      card: data.card,
      showImg: data.showImg,
      newImage: this.userImgCropped,
      convoys: this.selectedConvoys,
    };

    this.loading.form = true;
    this.subscriptions.push(
      this.api.post('member', postData).subscribe({
        next: (res: any) => {
          this.loading.form = false;
          this.dmc.setItem('auth', res);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.loading.form = false;
          if ((err.status = 422)) {
            if (err.error.message) {
              this.form.message = err.error.message;
            } else {
              this.form.errors = err.error;
              console.log(err.error);
            }
          } else {
            this.form.message = err.error.message || err.message;
          }
        },
      })
    );
  }
  getSelect() {
    this.subscriptions.push(
      this.api.get('select/convoys').subscribe({
        next: (data: any) => {
          this.consvoys = data;
        },
        error: (err) => {
          this.dmc.message('حدث خطأ', 'error');
        },
      })
    );
    this.subscriptions.push(
      this.api.get('select/committees').subscribe({
        next: (data: any) => {
          this.committees = data;
        },
        error: (err) => {
          this.dmc.message('حدث خطأ', 'error');
        },
      })
    );
  }
  onFileChanged(event: any) {
    this.userImg = event;
    this.userImgBox = true;
    this.userImgBoxReady = false;
  }
  cropImg(croppedImg: any) {
    let reader = new FileReader();
    reader.readAsDataURL(croppedImg.blob);
    reader.onloadend = () => {
      this.userImgCropped = reader.result;
    };
  }
  initCropper() {
    setTimeout(() => {
      this.userImgBoxReady = true;
    }, 222);
  }
  imgFaild() {
    this.dmc.message('حدث خطأ', 'error');
  }
  removeError(error: any) {
    if (error) {
      delete this.form.errors?.[error];
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
