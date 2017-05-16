import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

/**
* Generated class for the Snap page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-snap',
    templateUrl: 'snap.html',
})
export class Snap {
    public picture: String;
    public displayFriendMenu: Boolean = false;

    constructor(private cameraPreview: CameraPreview, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        const cameraPreviewOpts: CameraPreviewOptions = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: 'rear',
            toBack: true,
            tapPhoto: false,
            previewDrag: false,
            alpha: 1
        };

        // start camera
        this.cameraPreview.startCamera(cameraPreviewOpts).then(
            (res) => {
                console.log(res)
            },
            (err) => {
                console.log(err)
            }
        );

        console.log('ionViewDidLoad Snap');
    }

    switchCamera() {
        this.cameraPreview.switchCamera();
    }

    clickFriendMenu() {
        this.displayFriendMenu = true;
    }

    takePicture() {
        const pictureOpts = {
            width: 1280,
            height: 1280,
            quality: 100
        }

        this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
            this.cameraPreview.stopCamera();
            this.picture = 'data:image/jpeg;base64,' + imageData;
            //console.log(picture);
        }, (err) => {
            console.log(err);
        });
    }

}
