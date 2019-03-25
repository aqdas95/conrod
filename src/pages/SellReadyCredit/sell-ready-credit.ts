import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { TranslateService } from '../../module/ng2-translate';

import { Storage } from '@ionic/storage';
import { StorageMulti } from '../../service/storage-multi.service';
import { Core } from '../../service/core.service';
import { Device } from '@ionic-native/device/ngx';

import { AccountPage } from '../account/account';
import { SMS } from '@ionic-native/sms';
import { DataSet } from '../../app/config';
import { Network } from '@ionic-native/network/ngx';

// Pipe
import { StaticPipe } from '../../pipes/static/static';
// import { HomePage } from '../home/home';
import { APIServiceProvider } from '../../providers/api-service/api-service';
@Component({
  selector: 'page-sell-ready-credit',
  templateUrl: 'sell-ready-credit.html',
  providers: [StorageMulti, Device, Core]
})
export class ServiceSellPage {
  data                  : DataSet = new DataSet();
  amount                : string;
  new_pin               : string;
  url                   : string;
  networkType           : string = "";
  networkStatusOnline   : boolean = true;

  userData = { credit_value: "Default" , service_name: "Default",
                provider_reference: this.data.providerRefCommando, app_secret: this.data.appSecret};

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private apiServiceProvider: APIServiceProvider,
    public network: Network,
    private clipboard: Clipboard,
    public storage: Storage,
    public storageMul: StorageMulti,
  )
  {
    if(this.networkType == "unknown" || this.networkType == "none" || this.networkType == undefined)
    {
      this.displayNetworkStatus('Your internet connection appears to be offline !!!');
      this.networkStatusOnline = false;
    }
    else
    {
      this.networkStatusOnline = true;
    }
  }

  generatePIN()
  {
    if(this.amount == null)
    {
      this.presentErrorToast();
    }
    else
    {
      if(this.networkStatusOnline)
      {
        this.userData.credit_value  = this.amount;
        this.storage.get('serviceName').then(res =>{
          this.userData.service_name  = res;
          this.presentLoadingCustom();
        });
      }
      else
      {
        this.displayNetworkStatus('Your internet connection appears to be offline !!!');
      }
    }
  }

  public displayNetworkStatus(msg)
  {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  presentLoadingCustom()
  {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

    loading.present();

    // Code for generating PIN
    this.apiServiceProvider.postData(this.userData).then((result) =>
    {
      console.log(result);
      this.new_pin = result.toString();
      this.clipboard.copy(this.new_pin);
      loading.dismiss();
    }, (err) =>
    {
      console.log(err);
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed Loading');
      this.presentSuccessToast();
    });
  }

  presentSuccessToast()
  {
    let toast = this.toastCtrl.create({
      message: 'Operation successfull!',
      duration: 2000,
      position: 'Bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed success toast');
      this.presentSuccessToastMsg();
    });

    toast.present();
  }

  presentSuccessToastMsg()
  {
    let toast = this.toastCtrl.create({
      message: 'The PIN has been copied and is ready to be used for your Top-Up',
      duration: 5000,
      position: 'Bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed success toast message');
    });

    toast.present();
  }

  presentErrorToast()
  {
    let toast = this.toastCtrl.create({
    message: 'Please select an amount!',
    duration: 3000,
    position: 'Bottom'
    });

    toast.onDidDismiss(() => {
    console.log('Dismissed error toast');
    });

    toast.present();
  }
}
