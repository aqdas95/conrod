import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '../../module/ng2-translate';

import { ServiceRegisterPage } from '../RegisterUser/register-user';
import { ServiceTopUpPage } from '../TopupReadyCredit/topup-ready-credit';
import { ServiceCreditPage } from '../BalanceCheck/balance-check';
import { ServiceSellPage } from '../SellReadyCredit/sell-ready-credit';

// Pipe
import { StaticPipe } from '../../pipes/static/static';

@Component({
  selector: 'page-reseller',
  templateUrl: 'reseller.html'
})
export class ResellerPage {

	constructor(public navCtrl: NavController, public navParams: NavParams)
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
