import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpHeaders } from '../../../node_modules/@angular/common/http';
import 'rxjs/add/operator/map';

let apiUrl          = "http://sc2.gocyberflex.net/gcel/rtvexpress01.php";
let authenticateURL = "http://sc2.gocyberflex.net/gcel/ahelpscp.php";

@Injectable()
export class APIServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ServiceProvider');
  }

  postData(creds) {
    try {
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl, creds).subscribe(res => {
            console.log(res["_body"]);
            resolve(res["_body"]);
        }, (err) =>
        {
          reject(err);
        });
      });

    }
    catch (reject) {

    }
  }

  postAuthenticate(creds) {
    try {
      return new Promise((resolve, reject) => {
        this.http.post(authenticateURL, creds).subscribe(res => {
            console.log(res);
            console.log(res["status"]);
            resolve(res["status"]);
        }, (err) =>
        {
          reject(err);
        });
      });

    }
    catch (reject) {

    }
  }
}