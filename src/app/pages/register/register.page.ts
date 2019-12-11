import { Component, OnInit, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 
  constructor(private alertCtrl: AlertController, private router: Router, public afAuth: AngularFireAuth, private authService: AuthServiceService) { 
  }

  email: string = ''
  password: string =''
  cpassword: string = ''


  ngOnInit() {
  }


  async register() {
    const {email, password, cpassword} = this
    if (password !== cpassword) {
      return this.showRegAlert();
    } 
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['/list']);
    }
    catch(error) {
      let alert = await this.alertCtrl.create({
        header: error.code,
        message: error.message,
        buttons: ['OK']
        
      });
      alert.present();
  
    }
  }
  
  async showRegAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Password not matching',
      message: 'The entered passwords did not match, please try again',
      buttons: ['OK']
    });
    alert.present();
  }
}
