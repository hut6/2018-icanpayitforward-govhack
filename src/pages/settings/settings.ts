import {Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';

import { Settings } from '../../providers';
import {Camera} from "@ionic-native/camera";
import {ContentPage, ListMasterPage} from "../";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
@ViewChild(Nav) nav: Nav;
  @ViewChild('fileInput') fileInput;
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public camera: Camera) {
  }

  _buildForm() {
    let group: any = {
        name: [this.options.name],
        profilePic: [this.options.profilePic],
        accountType: [this.options.accountType],
        age: [this.options.age]
    };

    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
      // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    });

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

    getPicture() {
        if (Camera['installed']()) {
            this.camera.getPicture({
                quality: 80,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                allowEdit: true,
                targetWidth: 250,
                targetHeight: 250,
                correctOrientation: true
            }).then((data) => {
                this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
            }, (err) => {
                alert('Unable to take photo');
            })
        } else {
            this.fileInput.nativeElement.click();
        }
    }

    processWebImage(event) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let imageData = (readerEvent.target as any).result;
            this.form.patchValue({ 'profilePic': imageData });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    getProfileImageStyle() {
        return 'url(' + this.form.controls['profilePic'].value + ')'
    }

    continue(){
        if (this.form.controls['accountType'].value == 'driver'){
            this.navCtrl.setRoot(ListMasterPage);
        } else {
            this.navCtrl.setRoot(ContentPage);
            //this.navCtrl.setRoot(page.component);
        }
    }


    ngOnChanges() {
    console.log('Ng All Changes');
  }
}
