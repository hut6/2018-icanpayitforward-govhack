import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  showAlert:any = false;

  constructor(public navCtrl: NavController, navParams: NavParams, public items: Items, public modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.currentItems = null;
    this.showAlert = navParams.get('showAlert');
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
      if (this.showAlert){
          this.confirmAlert();
      }
  }

  ionViewWillEnter() {
      this.items.query()
          .then((response):any => {
              console.log(response);
              this.currentItems = [];
              response.forEach(i => {
                  this.currentItems.push(JSON.parse(i.tripData));
              });

              this.currentItems = this.currentItems.reverse();
              console.log(this.currentItems);
          })
          .catch (response => console.log(response));
      ;
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

    confirmAlert() {
        let alert = this.alertCtrl.create({
            title: 'Thank You!',
            subTitle: 'The requester has been notified about your act of kindness.',
            buttons: ['Continue']
        });
        alert.present();
    }

    donate(user) {
        let alert = this.alertCtrl.create({
            title: 'Donate',
            subTitle: 'Donate to ' + user + " to show they're doing a good job!",
            inputs: [
                {
                    name: 'amount',
                    placeholder: 'Amount'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                    }
                },
                {
                    text: 'Donate',
                    handler: data => {
                    }
                }
            ]
        });
        alert.present();
    }

}
