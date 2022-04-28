import { User } from "src/app/model/user/user.model";
import { AppInitialState } from "./AppInitialState";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducers";
import { LoginState } from "./loginState";

describe("Login store", ()=>{

    const initialState : LoginState = AppInitialState.login;
    it("recoverPassword", ()=>{
      
        const initialState : LoginState = AppInitialState.login;
        const newState= loginReducer(initialState, recoverPassword());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true,
        })
    });
    it("recoverPasswordSuccess", ()=>{
      
        const initialState : LoginState = AppInitialState.login;
        const newState= loginReducer(initialState, recoverPasswordSuccess());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false,
        })
    });
    it("recoverPasswordFail", ()=>{
      
        const initialState : LoginState = AppInitialState.login;
        const error= {error: 'error'};
        const newState= loginReducer(initialState, recoverPasswordFail({error}));
        expect(newState).toEqual({
            ...initialState,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false,
        })
    });
    it('login', ()=>{
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, login());
        expect (newState).toEqual({
            ...initialState,
            error: null,
            isLoggedIn: false,
            isLogginIn: true
        })
    });
    it('loginSuccess', ()=>{
        const initialState: LoginState = {
            ...AppInitialState.login,
            isLoggingIn:true
        }
        const user = new User();
        user.id= "anyId";
        const newState = loginReducer(initialState, loginSuccess({user}));
        expect (newState).toEqual({
            ...initialState,
            isLoggedIn: true,
            isLogginIn: false
        })
    });

    it('loginFail', ()=>{
        const initialState: LoginState = {
            ...AppInitialState.login,
            isLoggingIn:true
        }
        const error= {errror: "error"}
        const newState = loginReducer(initialState, loginFail({error}));
        expect (newState).toEqual({
            ...initialState,
            error,
            isLoggedIn: false,
            isLogginIn: false
        })
    });
});