import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit() {
    this.loginForm = new LoginPageForm(this.fb).createForm();

  }

  login() {
    this.router.navigate(['home'])
  }
  register() {
    this.router.navigate(['register'])
  }
 
}
