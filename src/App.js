import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Components/Login/Login.css";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import SideNav from "./Components/SideNav/SideNav";
import TopNav from "./Components/TopNav/TopNav";
import MarkerCreator from "./Components/Map/Markers/Marker";
import LayerCreator from "./Components/Map/Layers/LayerCreator";
import Mapped from "./Components/Map/Map/Map";
import Firebase from "firebase";
import Modal from "./Components/Modal/Modal";
import "firebase/auth";
import "firebase/firestore";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwbWFrZXIxMjM0IiwiYSI6ImNraGM0aWllOTBhdnQycm5nMzk3ZzFwMW0ifQ.DUTM9-gpBSGHav22OeLhQg";
function App() {
  const [isLoggedIn, setLoginState] = useState(false);
  // return <div className="App">{isLoggedIn ? <Site /> : <Login />}</div>;
  return <div>{<Login />}</div>;
}
function Site() {
  const [events, setEvents] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  var a = "";
  function getData(latLng) {
    setLat(latLng.lat);
    setLng(latLng.lng);
  }
  useEffect(() => {
    let ref = Firebase.database().ref("/");
    ref.on("value", (snapshot) => {
      const a = snapshot.val();
      console.log("IDD");
      console.log(a);
      setEvents(Object.values(a));

      console.log(events);
    });
  }, []);
  useEffect(() => {
    console.log(events);
  });
  return (
    <div className="App">
      {!Firebase.apps.length ? Firebase.initializeApp(firebaseConfig) : null}

      <TopNav />
      <SideNav />
      <Modal lat={lat} lng={lng} />
      <Mapped
        width={"100vw"}
        height={"100vh"}
        position={"absolute"}
        sendData={getData}
      >
        <LayerCreator
          id="myLocation"
          coords={[13.342814, 52.488653]}
          color="teal"
        />

        <MarkerCreator
          data={events}
          key={"i"}
          id={"item.title"}
          coords={[0, 0]}
          color="orange"
        />
      </Mapped>
    </div>
  );
}

function Login() {
  const [showSignUp, setShowSignUp] = useState(false);

  function toggleShowSignUp(showSignUp) {
    if (showSignUp) {
      setShowSignUp(false);
    } else {
      setShowSignUp(true);
    }
    console.log(showSignUp);
  }
  return (
    <FirebaseAuthProvider firebase={Firebase} {...firebaseConfig}>
      <div className="App">
        <FirebaseAuthConsumer>
          {({ isSignedIn, firebase }) => {
            if (isSignedIn === true) {
              return (
                <div>
                  <button
                    onClick={() => {
                      firebase.app().auth().signOut();
                    }}
                  >
                    Sign out
                  </button>
                  <Site />
                </div>
              );
            } else {
              return (
                <div>
                  <button
                    onClick={() => toggleShowSignUp(showSignUp)}
                    className="btn-primary"
                  >
                    SIGN UP
                  </button>
                  {showSignUp ? <SignUpForm /> : <LoginForm />}
                </div>
              );
            }
          }}
        </FirebaseAuthConsumer>
      </div>
    </FirebaseAuthProvider>
  );
}

function LoginForm() {
  var googleProvider = new Firebase.auth.GoogleAuthProvider();
  var fbProvider = new Firebase.auth.FacebookAuthProvider();
  var twitterProvider = new Firebase.auth.TwitterAuthProvider();

  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  function handleTitleChange(event) {
    setTitle(event.target.value);
    console.log(title);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
    console.log(password);
  }
  function SignInWithGoogle() {
    Firebase.auth().signInWithRedirect(googleProvider);
  }
  function SignInWithFacebook() {
    Firebase.auth().signInWithRedirect(fbProvider);
  }
  function SignInWithTwitter() {
    Firebase.auth().signInWithRedirect(twitterProvider);
  }

  return (
    <div style={{ width: "100vw", float: "right" }}>
      <div class="omb_login">
        <h3 class="omb_authTitle">
          Login or <a href="#">Sign up</a>
        </h3>
        <div class="row omb_row-sm-offset-3 omb_socialButtons">
          <div class="col-xs-4 col-sm-2">
            <a
              onClick={SignInWithFacebook}
              href="#"
              class="btn btn-lg btn-block omb_btn-facebook"
            >
              <i class="fa fa-facebook visible-xs"></i>
              <span class="hidden-xs">Facebook</span>
            </a>
          </div>
          <div class="col-xs-4 col-sm-2">
            <a
              onClick={SignInWithTwitter}
              href="#"
              class="btn btn-lg btn-block omb_btn-twitter"
            >
              <i class="fa fa-twitter visible-xs"></i>
              <span class="hidden-xs">Twitter</span>
            </a>
          </div>
          <div class="col-xs-4 col-sm-2">
            <a
              onClick={SignInWithGoogle}
              href="#"
              class="btn btn-lg btn-block omb_btn-google"
            >
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
                onChange={handleTitleChange}
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
                onChange={handlePasswordChange}
              />
            </div>
            <span class="help-block">Password error</span>

            <button
              class="btn btn-lg btn-primary btn-block"
              onClick={() => {
                Firebase.app()
                  .auth()
                  .signInWithEmailAndPassword(title, password);
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                Firebase.app().auth().signInAnonymously();
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
  );
}

function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  function handleUserNameChange(event) {
    setUserName(event.target.value);
    console.log(userName);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
    console.log(password);
  }

  return (
    <div>
      <div class="omb_login">
        <div class="row omb_row-sm-offset-3">
          <div class="jumbotron col-xs-12 col-sm-6">
            <h3 style={{ textAlign: "center" }}> Sign Up</h3>
            <div class="input-group">
              <span class="input-group-addon">
                <i class="fa fa-user"></i>
              </span>
              <input
                type="text"
                class="form-control"
                name="username"
                placeholder="email address"
                onChange={handleUserNameChange}
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
                onChange={handlePasswordChange}
              />
            </div>
            <span class="help-block">Password error</span>

            <button
              class="btn btn-lg btn-primary btn-block"
              onClick={() => {
                Firebase.app()
                  .auth()
                  .createUserWithEmailAndPassword(userName, password);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyD2i29incIhwYhsdJzjedfmtHrz-ARHhWs",
  authDomain: "eventx-bfe7f.firebaseapp.com",
  databaseURL:
    "https://eventx-bfe7f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eventx-bfe7f",
  storageBucket: "eventx-bfe7f.appspot.com",
  messagingSenderId: "1090088131508",
  appId: "1:1090088131508:web:f7c1254a2d4d30f22cf0e1",
  measurementId: "G-G3YF9RMG3Y",
};

export default App;
