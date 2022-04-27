import { FormBuilder } from "@angular/forms";
import { LoginPageForm } from "./login.page.form"

describe('LoginPageForm', ()=>{

    const loginPageForm = new LoginPageForm(new FormBuilder());

it('should create login form empty',()=>{

    expect(loginPageForm.createForm()).not.toBeNull();

})


})