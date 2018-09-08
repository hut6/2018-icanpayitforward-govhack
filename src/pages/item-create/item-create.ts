import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Settings} from "../../providers";

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

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              public camera: Camera,
              public settings: Settings,
  ) {

    this.type = params.get('type');
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this.form = this.formBuilder.group({
          profilePic: [this.options.profilePic],
          name: [this.options.name, Validators.required],
          type: [this.type],
          pickup: ['', Validators.required],
          destination: ['', Validators.required],
          time: ['', Validators.required],
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
