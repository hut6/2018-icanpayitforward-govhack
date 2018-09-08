import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';
import {Items} from "../../providers";

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) { }


    addItem(type) {
        let addModal = this.modalCtrl.create('ItemCreatePage', {type: type});
        addModal.onDidDismiss(item => {
            if (item) {
                this.items.add(item)
                    .then(response => console.log(response))
                    .catch (response => console.log(response));
            }
        })
        addModal.present();
    }

}
