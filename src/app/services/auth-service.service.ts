import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  authState = new BehaviorSubject(false);

  email: string = ''
  password: string =''
  cpassword: string = ''


  constructor(private afAuth: AngularFireAuth, private platform: Platform, private router: Router, private alertCtrl: AlertController ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }


   ifLoggedIn(){
    this.afAuth.authState.pipe(first()).toPromise().then((response) => {
       if(response) {
         this.authState.next(true);
       }
    })
  }





isAuthenticated() {
    return this.authState.value;
  }

}


