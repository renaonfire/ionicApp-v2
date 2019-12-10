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

  ngOnInit() {
  }


  register(){
    this.authService.register();
  }

}
