import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  authState = new BehaviorSubject(false);
  
  email: string = ''
  password: string =''
 
  constructor(public afAuth: AngularFireAuth, private alertCtrl: AlertController, private router: Router, private authService: AuthServiceService) { }

  ngOnInit() {
    
  }

 
  signIn(){
    
    this.authService.signIn(this.email, this.password);
  }



 

}
