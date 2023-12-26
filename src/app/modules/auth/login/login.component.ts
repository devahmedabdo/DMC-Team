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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    // private auth: AuthService,
    private fb: FormBuilder,
    // private storage: StorageService,
    private router: Router
  ) {}
  formType: string = 'login';
  ////////////////////////
  emailIcon = faMailBulk;
  eay = faEye;
  eayslash = faEyeSlash;
  contactIcon = faContactCard;
  PhoneIcon = faPhone;
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
  signupStep: number = 2;
  type: string = 'password';
  loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: [localStorage.getItem('password') || '', [Validators.required]],
  });
  signupForm = this.fb.group({
    firstName: ['22', [Validators.required]],
    lastName: ['22', [Validators.required]],
    email: ['ahmed22@gmail.com', [Validators.required, Validators.email]],
    password: ['223333322', [Validators.required, Validators.minLength(8)]],
    //
    phone: ['22', [Validators.required]],
    street: ['22', [Validators.required]],
    city: ['22', [Validators.required]],
    governate: ['22', [Validators.required]],
    country: ['22', [Validators.required]],
    age: [22, [Validators.required, Validators.min(10)]],
    //
    gender: ['22', [Validators.required]],
    accountType: ['22', [Validators.required]],
    avatar: [],
  });
  rememberMe: boolean = false;
  setRememberMe(key: string, value: string) {
    if (this.rememberMe) {
      // this.storage.storageItem(key, value);
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
  login(data: any) {
    // this.startPost = true;
    // this.auth.loging(data).subscribe({
    //   next: (token: any) => {
    //     localStorage.setItem('token', token);
    //     this.startPost = false;
    //   },
    //   error: (err) => {
    //     this.changeFormStatus(true);
    //     this.startPost = false;
    //   },
    // });
  }
  signup(data: any) {
    // this.auth.signup(data).subscribe({
    //   next: (res: any) => {
    //     localStorage.setItem('token', res.token);
    //     // this.uploudFile();
    //     this.startPost = false;
    //     // console.log(token);
    //   },
    //   error: (err) => {
    //     // this.changeFormStatus(true);
    //     this.startPost = false;
    //     this.signupErrors = err.error.errors;
    //     console.log(err);
    //   },
    // });
  }
  // handle(event: any) {
  //   this.userImg = event.target.files;
  // }

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
