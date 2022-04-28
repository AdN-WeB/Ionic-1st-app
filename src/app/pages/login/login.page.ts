import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/loginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginStateSubscription : Subscription;

  constructor(private router:Router,
              private fb:FormBuilder,
              private store:Store<AppState>,
              private toastController: ToastController,
              private authService: AuthService,
              
              ) { }
  ngOnDestroy(): void {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.loginForm = new LoginPageForm(this.fb).createForm();

    this.loginStateSubscription =this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState);  
      this.onIsRecoveredPasswordFail(loginState);  
    })
  };

  private async onIsRecoveredPasswordFail(loginState:LoginState){
    if (loginState.error){
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position:"bottom",
        message:loginState.error.message,
        color:"danger"
      });
      toaster.present();
    }
  };

  private onIsRecoveringPassword(loginState: LoginState){
    if(loginState.isRecoveringPassword){
      this.store.dispatch(show());

      this.authService.recoverEmailPassword(this.loginForm.get('email').value).subscribe(()=>{
        this.store.dispatch(recoverPasswordSuccess());
      },error => {this.store.dispatch(recoverPasswordFail({error}))
      });
    }
  };

  private async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position:"bottom",
        message:"Recovery email sent",
        color:"primary"
      });
      toaster.present();
    }

  };

  forgotEmailPassword(){
    this.store.dispatch(show());
    this.store.dispatch(recoverPassword());

    setTimeout(()=>{
      this.store.dispatch(hide())
    }, 2000);
  };

  login() {
    this.router.navigate(['home'])
  }
  register() {
    this.router.navigate(['register'])
  }
 
}
