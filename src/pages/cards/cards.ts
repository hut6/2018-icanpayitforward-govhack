import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cardItems: any[];

  constructor(public navCtrl: NavController,private alertCtrl: AlertController) {
    this.cardItems = [
      {
        user: {
          avatar: 'assets/img/marty-avatar.png',
          name: 'Marty McFly'
        },
        count: '45',
        distance: '250',
      },
      {
        user: {
          avatar: 'assets/img/sarah-avatar.png.jpeg',
          name: 'Sarah Connor'
        },
        count: '20',
        distance: '234',
      },
      {
        user: {
          avatar: 'assets/img/ian-avatar.png',
          name: 'Dr. Ian Malcolm'
        },
        count: '2',
        distance: '20',  }
    ];

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
