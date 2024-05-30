import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class DmcService {
  constructor(private toaster: ToastrService) {}
  private encryptKey = 'DMCv2Website2024';
  stored: any = {
    cart: new BehaviorSubject(null),
    liked: new BehaviorSubject(null),
  };

  setItem(key: string, value: any) {
    try {
      const encryptedValue = encodeURIComponent(
        CryptoJS.AES.encrypt(JSON.stringify(value), this.encryptKey) as any
      ).toString();
      localStorage.setItem(this.getKey(key), encryptedValue);
      // save encrypt data
    } catch (reason) {
      console.log(reason);
    }
  }

  getItem(key: string) {
    // check value
    try {
      const _key = this.getKey(key);
      let value: any = localStorage.getItem(_key);
      if (!value) {
        return null;
      }
      let deData = CryptoJS.AES.decrypt(
        decodeURIComponent(value),
        this.encryptKey
      ).toString(CryptoJS.enc.Utf8);

      const _value: any = JSON.parse(deData);
      return _value;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  appendItem(key: string, item: any) {
    try {
      let items: any[] = this.getItem(key) || [];
      items.push(item);
      this.setItem(key, items);
      return items;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(this.getKey(key));
  }

  getKey(key: string): string {
    return `DMC.${key.split('').reverse().join('')}`;
  }
  messageSounds: any = {
    info: new Audio('assets/sounds/done.mp3'),
    delete: new Audio('assets/sounds/delete.mp3'),
  };
  message(
    message: string,
    type: string,
    duration: number = 222000,
    sound?: string
  ) {
    this.toaster.show(message, undefined, undefined, type);
    try {
      if (sound) this.messageSounds[sound].play();
    } catch (e) {
      console.log(e);
    }
  }
}
