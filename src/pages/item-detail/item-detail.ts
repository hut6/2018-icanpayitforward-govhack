import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
} from '@ionic-native/google-maps';

import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  map: GoogleMap;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items,private alertCtrl: AlertController) {
    this.item = navParams.get('item');
  }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {

        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.item.lat,
                    lng: this.item.lng
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        let marker: Marker = this.map.addMarkerSync({
            title: 'Destination:' + this.item.destination,
            label: this.item.destination,
            icon: 'blue',
            animation: 'DROP',
            position: {
                lat: this.item.lat,
                lng: this.item.lng
            }
        });

        // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        //     alert('clicked');
        // });
    }

    accept(){
        this.navCtrl.push('ListMasterPage', {
            showAlert: true
        });
    }

}
