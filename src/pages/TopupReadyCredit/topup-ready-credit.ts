import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { TranslateService } from '../../module/ng2-translate';

import { AccountPage } from '../account/account';
import { SMS } from '@ionic-native/sms/ngx';
import { DataSet } from '../../app/config';

// Pipe
import { StaticPipe } from '../../pipes/static/static';
// import { HomePage } from '../home/home';

@Component({
  selector: 'page-topup-ready-credit',
  templateUrl: 'topup-ready-credit.html'
})
export class ServiceTopUpPage {
    data            : DataSet = new DataSet();
    rTVtelNum       : string;
    rTVaccountNum   : string;
    readyPin        : string;
    digitalBox      : string;
    smsBody         : string;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private sms: SMS)
  {
  }

  registerSubmit()
  {
    if(this.rTVtelNum == null || this.rTVaccountNum == null || this.readyPin == null || this.digitalBox == null)
    {
        this.presentErrorToast();
    }
    else
    {
      this.smsBody = "*" + this.rTVtelNum + "*" + this.rTVaccountNum + "*" + this.readyPin + this.digitalBox;
      console.log(this.smsBody);

      this.sms.send(this.data.smsSend, this.smsBody).then(()=>{
        this.presentSuccessToast();
        this.navCtrl.setRoot(AccountPage);

      },()=>{
        let toast = this.toastCtrl.create({
          message: 'Failure',
          duration: 3000        });
        toast.present();
        this.navCtrl.setRoot(AccountPage);
      });
    }
  }

  presentSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Operation successfull!',
      duration: 3000,
      position: 'Bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentErrorToast() {
    let toast = this.toastCtrl.create({
    message: 'Some fields are missing!',
    duration: 6000,
    position: 'Bottom'
    });

    toast.onDidDismiss(() => {
    console.log('Dismissed toast');
    });

    toast.present();
  }
}
