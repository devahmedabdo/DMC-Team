import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DmcService } from 'src/app/services/dmc.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnDestroy {
  headerOptions: any = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.dmc.getItem('auth')?.token,
      Accept: 'application/json',
    }),
  };
  subscriptions: Subscription[] = [];
  member: any;
  loading: any = {
    page: true,
    form: false,
  };
  signupForm = this.fb.group({
    fNameAr: [[Validators.required]],
    fNameEn: [[Validators.required]],
    lNameAr: [[Validators.required]],
    lNameEn: [[Validators.required]],
    email: [[Validators.required, Validators.email]],
    password: [],
    committee: [[Validators.required]],
    whatsapp: [],
    twitter: [],
    facebook: [],
    instagram: [],
    joinDate: [[Validators.required]],
    showImg: [],
    card: [],
  });
  modal: any = {
    name: {
      first: {
        ar: null,
        en: null,
      },
      last: {
        ar: null,
        en: null,
      },
    },
    socialAccounts: {
      facebook: null,

      whatsapp: null,

      twitter: null,

      instagram: null,
    },
    joinDate: null,
    password: null,
    committee: null,
    email: null,
    card: null,
    showImg: null,
    image: null,
    convoys: null,
  };
  convoys: any[] = [];
  committees: any[] = [];
  form: any = {
    errors: null,
    message: null,
  };
  userImgBox: boolean = false;
  userImgBoxReady: boolean = false;
  userImg: any;
  userImgCropped: any;
  constructor(
    private api: ApiService,
    private dmc: DmcService,
    private fb: FormBuilder
  ) {
    this.get();
    this.getSelect();
  }
  get() {
    this.subscriptions.push(
      this.api.get('member', this.headerOptions).subscribe({
        next: (data: any) => {
          this.member = data;
          this.modal = JSON.parse(JSON.stringify(data));
          this.loading.page = false;
        },
        error: (error: any) => {
          this.dmc.message('حدث خطأ', 'error');
        },
      })
    );
  }
  update() {
    this.form = {
      errors: null,
      message: null,
    };
    if (!this.modal.password) delete this.modal.password;
    this.loading.form = true;
    this.subscriptions.push(
      this.api.patch('member', this.modal, this.headerOptions).subscribe({
        next: (res: any) => {
          this.loading.form = false;
          let auth = this.dmc.getItem('auth');
          auth.member = res;
          this.dmc.setItem('auth', auth);
          this.dmc.message('تم تحديث البيانات بنجاح', 'info');
          this.dmc.data['member'].next(null);
        },
        error: (err) => {
          this.dmc.message('حدث خطأ', 'error');
          this.loading.form = false;
          if ((err.status = 422)) {
            this.form.errors = err.error;
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
          this.convoys = data;
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
  selectChange(event: any, id: string) {
    if (event.checked) {
      this.modal.convoys.push(id);
    } else {
      this.modal.convoys.splice(this.modal.convoys.indexOf(id), 1);
    }
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
      this.modal.image = reader.result;
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
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => {
      item.unsubscribe();
    });
  }
}
