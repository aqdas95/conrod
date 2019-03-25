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
  selector: 'page-register-user',
  templateUrl: 'register-user.html'
})
export class ServiceRegisterPage {
  data          : DataSet = new DataSet();
  firstName     : string;
  lastName      : string;
  telNum        : string;
  digitalBoxID  : string;
  digitalBox    : string;
  smsBody       : string;

	constructor(public navCtrl: NavController, private toastCtrl: ToastController, private sms: SMS)
  {
  }

  registerSubmit()
  {
    if(this.firstName == null || this.lastName == null || this.telNum == null || this.digitalBoxID == null || this.digitalBox == null)
    {
        this.presentErrorToast();
    }
    else
    {
      this.smsBody = "*" + this.telNum + "*" + this.firstName + "*" + this.lastName + "*" + this.digitalBoxID + this.digitalBox;
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
      message: 'Registeration successfull!',
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
