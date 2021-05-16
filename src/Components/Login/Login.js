// see https://react-firebase-js.com/docs/guides/build-a-react-app-with-firebase-auth-and-realtime-database/add-google-and-anonymous-auth
import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "../Login/Login.css";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";

const config = {
  apiKey: "AIzaSyAQZigEdL_kIIwV9nnwO_TnFvem05OxLb0",
  authDomain: "fir-react-auth-e4ce0.firebaseapp.com",
  databaseURL: "https://fir-react-auth-e4ce0.firebaseio.com",
  projectId: "fir-react-auth-e4ce0",
  storageBucket: "fir-react-auth-e4ce0.appspot.com",
  messagingSenderId: "108840477979",
};

function Login() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <div className="App">
        <FirebaseAuthConsumer>
          {({ isSignedIn, firebase }) => {
            if (isSignedIn === true) {
              return (
                <div>
                  <h2>You're signed in 🎉 </h2>
                  <button
                    onClick={() => {
                      firebase.app().auth().signOut();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              );
            } else {
              return (
                <div>
                  <LoginForm />
                </div>
              );
            }
          }}
        </FirebaseAuthConsumer>
        {/* <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer> */}
      </div>
    </FirebaseAuthProvider>
  );
}

function LoginForm() {
  return (
    <>
      <div class="container">
        <div class="omb_login">
          <h3 class="omb_authTitle">
            Login or <a href="#">Sign up</a>
          </h3>
          <div class="row omb_row-sm-offset-3 omb_socialButtons">
            <div class="col-xs-4 col-sm-2">
              <a href="#" class="btn btn-lg btn-block omb_btn-facebook">
                <i class="fa fa-facebook visible-xs"></i>
                <span class="hidden-xs">Facebook</span>
              </a>
            </div>
            <div class="col-xs-4 col-sm-2">
              <a href="#" class="btn btn-lg btn-block omb_btn-twitter">
                <i class="fa fa-twitter visible-xs"></i>
                <span class="hidden-xs">Twitter</span>
              </a>
            </div>
            <div class="col-xs-4 col-sm-2">
              <a href="#" class="btn btn-lg btn-block omb_btn-google">
                <i class="fa fa-google-plus visible-xs"></i>
                <span class="hidden-xs">Google+</span>
              </a>
            </div>
          </div>

          <div class="row omb_row-sm-offset-3 omb_loginOr">
            <div class="col-xs-12 col-sm-6">
              <hr class="omb_hrOr" />
              <span class="omb_spanOr">or</span>
            </div>
          </div>

          <div class="row omb_row-sm-offset-3">
            <div class="col-xs-12 col-sm-6">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  name="username"
                  placeholder="email address"
                />
              </div>
              <span class="help-block"></span>

              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <span class="help-block">Password error</span>

              <button
                class="btn btn-lg btn-primary btn-block"
                onClick={() => {
                  firebase.app().auth().signInAnonymously();
                }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  firebase.app().auth().signInAnonymously();
                }}
                class="btn btn-lg btn-light btn-block"
              >
                Login as Guest
              </button>
            </div>
          </div>
          <div class="row omb_row-sm-offset-3">
            <div class="col-xs-12 col-sm-3">
              <label class="checkbox">
                <input type="checkbox" value="remember-me" />
                Remember Me
              </label>
            </div>
            <div class="col-xs-12 col-sm-3">
              <p class="omb_forgotPwd">
                <a href="#">Forgot password?</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
