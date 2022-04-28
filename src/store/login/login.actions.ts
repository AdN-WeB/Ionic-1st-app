import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/user.model";

export const recoverPassword = createAction("[Recover Password]");
export const recoverPasswordSuccess = createAction("[Recover Password] success");
export const recoverPasswordFail = createAction("[Recover Password] fail", props<{error:any}>());

export const login = createAction("[login]");
export const loginSuccess = createAction('[login] success', props<{user:User}>());
export const loginFail = createAction("[login] fail", props<{error: any}>());
