import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';
import { faEdit, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
// import { StorageService } from './../../services/storage.service';
import {
  faBuildingUser,
  faCamera,
  faCity,
  faContactCard,
  faExchange,
  faFemale,
  faHome,
  faLocation,
  faLocationDot,
  faMailBulk,
  faMailReply,
  faMale,
  faPhone,
  faStreetView,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {
  animate,
  style,
  transition,
  trigger,
  state,
} from '@angular/animations';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ApiService } from 'src/app/services/api.service';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    // private auth: AuthService,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}
  formType: string = 'login';
  ////////////////////////
  emailIcon = faMailBulk;
  eay = faEye;
  eayslash = faEyeSlash;
  contactIcon = faContactCard;
  whatsappIcon = faWhatsapp;
  twitterIcon = faTwitter;
  instagramIcon = faInstagram;
  facebookIcon = faFacebook;
  locationIcon = faLocationDot;
  cityIcon = faCity;
  governateIcon = faStreetView;
  streetIcon = faHome;
  male = faMale;
  female = faFemale;
  buyer = faUserTie;
  seller = faBuildingUser;
  camera = faCamera;
  change = faExchange;
  ////////////////////////
  signupStep: number = 1;
  type: string = 'password';

  loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: [localStorage.getItem('password') || '', [Validators.required]],
    rememberMe: [false],
  });

  signupForm = this.fb.group({
    firstNameAr: ['22', [Validators.required]],
    firstNameEn: ['22', [Validators.required]],
    lastNameAr: ['22', [Validators.required]],
    lastNameEn: ['22', [Validators.required]],
    // step 2
    email: ['ahmed22@gmail.com', [Validators.required, Validators.email]],
    password: ['223333322', [Validators.required, Validators.minLength(8)]],
    consvoys: [[], [Validators.required, Validators.minLength(1)]],
    committee: ['', [Validators.required]],
    // step 3
    whatsapp: ['22', [Validators.required]],
    twitter: ['22', [Validators.required]],
    facebook: ['22', [Validators.required]],
    instagram: ['22', [Validators.required]],

    city: ['22', [Validators.required]],
    street: ['22', [Validators.required]],
    governate: ['22', [Validators.required]],
    country: ['22', [Validators.required]],
    age: [22, [Validators.required, Validators.min(10)]],
    //
    gender: ['22', [Validators.required]],
    accountType: ['22', [Validators.required]],
    avatar: [],
  });

  consvoys: any[] = [
    {
      name: 'PR',
      id: '2331',
    },
    {
      name: 'OC',
      id: '221',
    },
    {
      name: 'AC',
      id: '2441',
    },
    {
      name: 'Media',
      id: '5521',
    },
    {
      name: 'OC',
      id: '221',
    },
    {
      name: 'AC',
      id: '2441',
    },
    {
      name: 'Media',
      id: '5521',
    },
    {
      name: 'OC',
      id: '221',
    },
    {
      name: 'AC',
      id: '2441',
    },
    {
      name: 'Media',
      id: '5521',
    },
    {
      name: 'OC',
      id: '221',
    },
    {
      name: 'AC',
      id: '2441',
    },
    {
      name: 'Media',
      id: '5521',
    },
  ];
  committees: any[] = [
    {
      name: 'الحجر المحروق',
      id: '21',
    },
    {
      name: 'الفخراني',
      id: '212',
    },
    {
      name: 'طيبة',
      id: '33',
    },
  ];

  saveData(data: any) {
    if (data.rememberMe) {
      localStorage.setItem('password', data.password);
      localStorage.setItem('email', data.email);
    }
  }
  loginInvalid: boolean = false;
  // signupInvalid: boolean = false;
  signupEmailDublicated: boolean = false;
  // signupInvalidPhone!: boolean;
  startPost?: boolean;
  signupErrors!: any;
  userImg: any;
  userImgCropped: any;

  form: any = {
    errors: null,
    message: null,
  };
  reset() {
    this.form = {
      errors: null,
      message: null,
    };
  }
  login(data: any) {
    this.reset();
    this.loading.form = true;
    console.log(data);
    this.startPost = true;
    this.api.post('member/login', data).subscribe({
      next: (token: any) => {
        console.log(token);
        // localStorage.setItem('token', token);
        this.startPost = false;
        this.loading.form = false;
      },
      error: (err) => {
        this.changeFormStatus(true);
        this.loading.form = false;
        this.startPost = false;
      },
    });
  }
  loading: any = {
    form: false,
    page: false,
  };
  signup() {
    this.api.post('member', {}).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        // this.uploudFile();
        this.startPost = false;
        // console.log(token);
      },
      error: (err) => {
        // this.changeFormStatus(true);
        this.startPost = false;
        if ((err.status = 422)) {
          this.form.errors = err.error;
        } else {
          this.form.message = err.message;
        }
        console.log(err);
      },
    });
  }
  // handle(event: any) {
  //   this.userImg = event.target.files;
  // }

  getSelect() {
    this.api.get('select/convoys').subscribe({
      next: (data: any) => {
        this.consvoys = data;
      },
      error: (err) => {},
    });
    this.api.get('select/committees').subscribe({
      next: (data: any) => {
        this.committees = data;
      },
      error: (err) => {},
    });
  }

  userImgBox: boolean = false;
  userImgBoxReady: boolean = false;
  onFileChanged(event: any) {
    this.userImg = event;
    this.userImgBox = true;
  }
  cropImg(croppedImg: ImageCroppedEvent) {
    // console.log(croppedImg);
    this.userImgCropped = croppedImg.base64;
    this.signupForm.controls.avatar.setValue(this.userImgCropped);
  }
  imgLoad() {
    console.log('image loaded succesfully');
  }
  initCropper() {
    console.log('image cropped succesfully');
    this.userImgBoxReady = true;
  }
  imgFaild() {
    console.log('failed !!');
  }

  uploudFile() {
    // if (this.userImg) {
    //   let myData = new FormData();
    //   // myData.
    //   console.log(this.userImgCropped);
    //   console.log(this.userImg.target.files);
    //   myData.append('avatar', this.userImg.target.files[0]);
    //   console.log(myData);
    //   this.auth.addImage(this.userImgCropped).subscribe({
    //     next: (res) => {
    //       console.log(res);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    // }
  }
  removeError(error: any) {
    // console.log(this.signupEmailDublicated);
    // console.log(this.formType);
    // console.log(this.signupForm);
    if (error) {
      // delete
      delete this.signupErrors?.[error];
      // console.log(this.signupErrors);
      // console.log(any);
      // any = false;
      // [].indexOf
      // this.signupErrors.indexOf(any);
    }
  }
  checkEmail() {
    // if (this.signupForm.controls.email.valid) {
    //   this.auth
    //     .checkEmail({ email: this.signupForm.controls.email.value })
    //     .subscribe({
    //       next: (emailExist: any) => {
    //         this.signupEmailDublicated = emailExist;
    //         console.log(emailExist);
    //         // console.log(this.signupForm.value);
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //     });
    // }
  }
  changeFormStatus(status: boolean) {
    this.loginInvalid = status;
    // this.signupInvalid = status;
    // this.signupEmailDublicated = status;
  }
  log(a: any) {
    console.log(a);
  }
  ngOnInit(): void {
    this.formType = this.router.url.replace('/', '');
    console.log(this.formType);
  }
}
