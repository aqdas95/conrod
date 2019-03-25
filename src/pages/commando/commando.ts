import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, AlertController, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { TranslateService } from '../../module/ng2-translate';

import { Device } from '@ionic-native/device';

import { ServiceRegisterPage } from '../RegisterUser/register-user';
import { ServiceTopUpPage } from '../TopupReadyCredit/topup-ready-credit';
import { ServiceCreditPage } from '../BalanceCheck/balance-check';
import { ServiceSellPage } from '../SellReadyCredit/sell-ready-credit';

// Pipe
import { StaticPipe } from '../../pipes/static/static';

@Component({
  selector: 'page-commando',
  templateUrl: 'commando.html'
})
export class CommandoPage {

	constructor(public navCtrl: NavController)
  {
  }

  serviceRegister()
  {
    this.navCtrl.push(ServiceRegisterPage);
  }

  serviceTopUp()
  {
    this.navCtrl.push(ServiceTopUpPage);
  }

  serviceBalance()
  {
    this.navCtrl.push(ServiceCreditPage);
  }

  serviceSell()
  {
    this.navCtrl.push(ServiceSellPage);
  }
}
