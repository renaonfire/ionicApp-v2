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
         console.log('if logged in: ', response)
       } 
    })
  }



  async signIn(email, password){
    
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.authState.next(true);
      this.router.navigate(['/list']);
      console.log('sign in', this.authState.value)
    } catch(err) {
      console.dir(err);
      if(err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
        this.showAlert();

      }
    }
  }

  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Log In Failed',
      message: 'Username or Password incorrect, please try again',
      buttons: ['OK']
    });
    alert.present();
}


async register(email, password, cpassword) {
  
  if (password !== cpassword) {
    return this.showRegAlert();
  } 
  try {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.authState.next(true);
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



logout(){
  this.afAuth.auth.signOut();
  this.router.navigate(['sign-in']);
  this.authState.next(false);
}




isAuthenticated() {
   
    return this.authState.value;
  }

}


