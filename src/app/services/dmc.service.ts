import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
type Data = {
  [key: string]: BehaviorSubject<any>;
};
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

  data: Data = {};

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
  check(arr: any[] = [], id: any): boolean {
    if (arr.length) {
      let isExist = arr.find((ele) => ele._id == id);
      return Boolean(isExist);
    }
    return false;
  }
  storeProduct(product: any, position: string, qty?: number) {
    if (qty) product.quantity = qty;
    this.appendItem(position, product);
    this.stored[position].next();
    this.message('تم اضافة المنتج', 'info', undefined, 'info');
  }
  removeProduct(id: any, position: string) {
    let products: any[] = this.getItem(position) || [];
    let productIndex = products.findIndex((ele) => ele._id == id);
    products.splice(productIndex, 1);
    this.setItem(position, products);
    this.stored[position].next();
    this.message('تم ازالة المنتج', 'info', undefined, 'delete');
  }

  // Function to set a session cookie
  getCookieName(key: string): string {
    return `DMC.${key.split('').reverse().join('')}`;
  }

  setSessionCookie(name: any, value: any) {
    try {
      const encryptedValue = encodeURIComponent(
        CryptoJS.AES.encrypt(JSON.stringify(value), this.encryptKey).toString()
      );
      document.cookie = `${this.getCookieName(name)}=${encryptedValue}; path=/`;
    } catch (e) {
      console.log(e);
    }
  }

  //   to get a cookie
  getCookie(name: any) {
    try {
      const _key = this.getCookieName(name);
      const nameEQ = _key + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          const decryptedData = CryptoJS.AES.decrypt(
            decodeURIComponent(c.substring(nameEQ.length, c.length)),
            this.encryptKey
          ).toString(CryptoJS.enc.Utf8);
          const _value: any = JSON.parse(decryptedData);
          return _value;
        }
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  //   to delete a cookie
  deleteCookie(name: any) {
    document.cookie = `${this.getCookieName(
      name
    )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
  clearAllCookies() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}
