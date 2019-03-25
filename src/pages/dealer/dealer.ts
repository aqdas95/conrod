import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '../../module/ng2-translate';
import { StaticPipe } from '../../pipes/static/static';

import { ServiceRegisterPage } from '../RegisterUser/register-user';
import { ServiceTopUpPage } from '../TopupReadyCredit/topup-ready-credit';
import { ServiceCreditPage } from '../BalanceCheck/balance-check';
import { ServiceSellPage } from '../SellReadyCredit/sell-ready-credit';

/**
 * Generated class for the DealerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dealer',
  templateUrl: 'dealer.html',
})
export class DealerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealerPage');
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
