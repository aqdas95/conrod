import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from '../module/ng2-translate';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Config } from '../service/config.service';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { MyApp } from './app.component';
import { HideShowComponent } from '../components/hide-show/hide-show';
import { ButtonQuantityComponent } from '../components/button-quantity/button-quantity';
import { AccountPage } from '../pages/account/account';
import { SMS } from '@ionic-native/sms/ngx';
import { CommandoPage } from '../pages/commando/commando';
import { ResellerPage } from '../pages/reseller/reseller';
import { ServiceRegisterPage } from '../pages/RegisterUser/register-user';
import { ServiceTopUpPage } from '../pages/TopupReadyCredit/topup-ready-credit';
import { ServiceCreditPage } from '../pages/BalanceCheck/balance-check';
import { ServiceSellPage } from '../pages/SellReadyCredit/sell-ready-credit';
import { DealerPage } from '../pages/dealer/dealer';
import { Clipboard } from '@ionic-native/clipboard/ngx';
//pipe
import { PricePipe } from '../pipes/price/price';
import { OderByPipe } from '../pipes/oder-by/oder-by';
import { ObjectToArrayPipe } from '../pipes/object-to-array/object-to-array';
import { FilterPipe } from '../pipes/filter/filter';
import { ArrayjoinPipe } from '../pipes/arrayjoin/arrayjoin';
import { StaticPipe } from '../pipes/static/static';
import { ViewmorePipe } from '../pipes/viewmore/viewmore';
import { RangePipe } from '../pipes/range/range';
import { TimeagoPipe } from '../pipes/timeago/timeago';
import { APIServiceProvider } from '../providers/api-service/api-service';
@NgModule({
  declarations: [
    MyApp,
    HideShowComponent,
    ButtonQuantityComponent,
    PricePipe,
    ViewmorePipe,
    OderByPipe,
    ObjectToArrayPipe,
    FilterPipe,
    ArrayjoinPipe,
    RangePipe,
    TimeagoPipe,
    StaticPipe,
    AccountPage,
    CommandoPage,
    ResellerPage,
    ServiceRegisterPage,
    ServiceTopUpPage,
    ServiceCreditPage,
    ServiceSellPage,
    DealerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'md-arrow-back',
      mode: 'ios',
      pageTransition: 'md-transition',
      platforms: {
          ios: {
            scrollAssist: false,
            autoFocusAssist: false
          }
      }
    }),
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    IonicStorageModule.forRoot({
      name: 'woocommerce_application',
      driverOrder: ['sqlite', 'websql', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    CommandoPage,
    ResellerPage,
    ServiceRegisterPage,
    ServiceTopUpPage,
    ServiceCreditPage,
    ServiceSellPage,
    DealerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Config,
    Network,
    Toast,
    SMS,
    AndroidPermissions,
    Clipboard,
	APIServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
