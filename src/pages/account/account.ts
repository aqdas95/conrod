import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, AlertController, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ToastController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { TranslateService } from '../../module/ng2-translate';
import { StorageMulti } from '../../service/storage-multi.service';
import { Config } from '../../service/config.service';
import { Core } from '../../service/core.service';

import { APIServiceProvider } from '../../providers/api-service/api-service';
import { CommandoPage } from '../commando/commando';
import { ResellerPage } from '../reseller/reseller';
import { DataSet } from '../../app/config';
import { DealerPage } from '../dealer/dealer';

// Pipe
import { StaticPipe } from '../../pipes/static/static';

declare var wordpress_url: string;
const wordpress_order = wordpress_url + '/wp-json/wooconnector/order';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  providers: [StorageMulti, Core]
})
export class AccountPage {


	isCache					: boolean; isLogin: boolean; loadedOrder: boolean;
	data					: any = {};
	appData         		: DataSet = new DataSet();
	authenticationSkipToast	: boolean;
	optionSelected			: string;

	userData = { user_name: "Default" , pass_word: "Default", app_secret: this.appData.appSecret};

	constructor(
		public storage: Storage,
		public storageMul: StorageMulti,
		public alertCtrl: AlertController,
		public translate: TranslateService,
		public platform: Platform,
		public http: Http,
		public navCtrl: NavController,
		public config: Config,
		public core: Core,
		public actionCtr: ActionSheetController,
		private toastCtrl: ToastController,
		private apiServiceProvider: APIServiceProvider,
		public loadingCtrl: LoadingController
	)
	{
		// this.getData();
	}
	ionViewDidEnter() {
		// if (this.isCache) this.getData();
		// else this.isCache = true;
		// this.getData();
		this.servicesOptionSelect();
	}

	presentPromptForAuthentication()
	{
		this.storage.remove('serviceName');
		this.authenticationSkipToast 	= true;
		let alert = this.alertCtrl.create(
		{
		  title: 'Authentication required to proceed',
		  inputs: [
			{
			  name: 'username',
			  placeholder: 'Username'
			},
			{
			  name: 'password',
			  placeholder: 'Password',
			  type: 'password'
			}
		  ],
		  buttons: [
			{
			  text: 'Cancel',
			  role: 'cancel',
			  handler: data => {
				console.log('Cancel clicked');
			  }
			},
			{
			  text: 'Login',
			  handler: data =>
			  {
				this.storage.set('serviceName', data.username);
				this.authenticateUser(data.username, data.password);

				// invalid login
				return this.authenticationSkipToast;
			  }
			}
		  ]
		});
		alert.present();
	}

	public displayErrorForAuthentication() {
		let toast = this.toastCtrl.create({
		  message: 'Username or Password is incorrect! Please try again.',
		  duration: 3000,
		  position: 'bottom'
		});
		toast.present();
	}

	public displayForNoUsername() {
		let toast = this.toastCtrl.create({
		  message: 'Username is missing.',
		  duration: 3000,
		  position: 'bottom'
		});
		toast.present();
	}

	public displayForNoPassword() {
		let toast = this.toastCtrl.create({
		  message: 'Password is missing.',
		  duration: 3000,
		  position: 'bottom'
		});
		toast.present();
	}

	public displayForEmpty() {
		let toast = this.toastCtrl.create({
		  message: 'Please enter credentials first.',
		  duration: 3000,
		  position: 'bottom'
		});
		toast.present();
	}

	authenticateUser(userNameCheck : string, passwordCheck : string)
	{
		this.authenticationSkipToast 	= true;

		if(!userNameCheck)
		{
			if(passwordCheck)
			{
				this.displayForNoUsername();
				this.authenticationSkipToast = false;
				return;
			}
			else
			{
				this.displayForEmpty();
				this.authenticationSkipToast = false;
				return;
			}
		}
		else
		{
			if(!passwordCheck)
			{
				this.displayForNoPassword();
				this.authenticationSkipToast = false;
				return;
			}
		}

		console.log(userNameCheck);
		console.log(passwordCheck);

		this.userData.user_name  = userNameCheck;
		this.userData.pass_word  = passwordCheck;

		this.presentLoadingCustomForAuthentication();
	}

	presentLoadingCustomForAuthentication()
	{
		let loading = this.loadingCtrl.create({
			content: 'Verifying...'
		  });

		loading.present();

		// Code for generating PIN
		this.apiServiceProvider.postAuthenticate(this.userData).then((result) =>
		{
			console.log(result);
			if(result == '200')
			{
				// logged in!
				console.log('Access Granted!');
				if(this.optionSelected == 'dealer')
				{
					this.navCtrl.push(DealerPage);
				}
				else if(this.optionSelected == 'commando')
				{
					this.navCtrl.push(CommandoPage);
				}
				else if(this.optionSelected == 'reseller')
				{
					this.navCtrl.push(ResellerPage);
				}
			}
			else
			{
				console.log('Access Not Granted!');
				this.displayErrorForAuthentication();
			}
			loading.dismiss();
		}, (err) =>
		{
		console.log(err);
		});
	}

	servicesOptionSelect(){
		let alert = this.alertCtrl.create();
		alert.setTitle('Please select user access type');
		alert.addInput({type: 'radio', label: 'Dealer access', value: 'dealer', checked: true});
    	alert.addInput({type: 'radio', label: 'Commando access', value: 'commando'});
    	alert.addInput({type: 'radio', label: 'Reseller access', value: 'reseller'});
		alert.addButton({
			text: 'OK',
			handler: data => {
				console.log('Service ok', data);

				if(data == 'dealer')
				{
					this.optionSelected = 'dealer';
					//this.navCtrl.push();
				}
				else if(data == 'commando')
				{
					this.optionSelected = 'commando';
					//this.navCtrl.push(CommandoPage);
				}
				else if(data == 'reseller')
				{
					this.optionSelected = 'reseller';
					//this.navCtrl.push(ResellerPage);
				}

				this.presentPromptForAuthentication();
			}
		});
		alert.addButton({
			text: 'Cancel',
			handler: data => {
				console.log('Service cancel', data);
			}
		});
		alert.present();
	}
}
