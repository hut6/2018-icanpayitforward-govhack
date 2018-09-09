import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Settings} from "../../providers";
import {HttpClient} from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  options: any;

  settingsReady = false;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  type: string;

  destinations: any = [];

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              public camera: Camera,
              public settings: Settings,
              public http: HttpClient
  ) {

    this.type = params.get('type');
  }

  ionViewDidLoad() {
    if (this.type=='doctor'){
        this.http.get('assets/json/medical.json').subscribe(data => {
            this.destinations = [];
            let i:any = data;
            i.medical.forEach(n => {
              n.services.forEach(j => {
                this.destinations.push(j);
              })
            })

        });
    } else {
        this.http.get('assets/json/fitness.json').subscribe(data => {
            this.destinations = [];
            let i:any = data;
            for (let key in i.fitness) {
                let n = i.fitness[key];
                n.forEach(j => {
                    this.destinations.push(j);
                })
            }
        });
    }
  }

  ionViewWillEnter() {
    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this.form = this.formBuilder.group({
          profilePic: [this.options.profilePic],
          name: [this.options.name, Validators.required],
          age: [this.options.age, Validators.required],
          type: [this.type],
          pickup: ['475 South Stuart Highway, Alice Springs NT 0870', Validators.required],
          lat: [''],
          lng: [''],
          destination: ['', Validators.required],
          date:['',Validators.required],
          time: ['', Validators.required],
          notes: ['']
      });

      // Watch the form for changes, and
      this.form.valueChanges.subscribe((v) => {
          this.isReadyToSave = this.form.valid;
      });

    });
  }

    getProfileImageStyle() {
      return 'url(' + this.form.controls['profilePic'].value + ')'
    }

    updateLatLng(){
        let i = (this.form.controls['destination'].value).toString().trim();
        this.destinations.forEach(n => {
            console.log(i);
            if (n.service == i){
                this.form.controls['lat'].setValue(n.lat);
                this.form.controls['lng'].setValue(n.lng);
                return;
            }
        })


    }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
