import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController} from 'ionic-angular';
import {Items} from "../../providers";

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,private alertCtrl: AlertController) { }


    addItem(type) {
        let addModal = this.modalCtrl.create('ItemCreatePage', {type: type});
        addModal.onDidDismiss(item => {
            if (item) {
                this.items.add(item)
                    .then(response => console.log(response))
                    .catch (response => console.log(response));
                this.confirmAlert();
            }
        })
        addModal.present();
    }

    confirmAlert() {
        let alert = this.alertCtrl.create({
            title: 'Thank You.',
            subTitle: 'Your request has been submitted. You will be notified when someone accepts your request.',
            buttons: ['Continue']
        });
        alert.present();
    }


    fakeAlert() {
        let alert = this.alertCtrl.create({
            title: 'Pack your bags!',
            subTitle: 'Tim Bob has accepted your request to take you to Alice Specialised Medicine at 4pm.',
            buttons: ['Continue']
        });
        alert.present();
    }

}
