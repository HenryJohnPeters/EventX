import Firebase from "firebase";
import mapboxgl, { Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import Map from "../Map/Map/Map";
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
  }
  showModal = (e) => {
    this.setState({
      show: true,
    });
  };
  hideModal = (e) => {
    this.setState({
      show: false,
    });
  };

  render() {
    if (!this.state.show) {
      console.log(this.props.showModal);
      return (
        <button className="createEventButton" onClick={this.showModal}>
          {" "}
          Host
        </button>
      );
    }
    return (
      <FBASE close={this.hideModal} lat={this.props.lat} lng={this.props.lng} />
    );
  }
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

class FBASE extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lng: "",
      title: "",
      description: "",
      value: "Sports",
      events: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLngChange = this.handleLngChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", (snapshot) => {
      const a = snapshot.val();
      console.log(a);
      this.setState({ events: a });
    });
  };

  handleSubmit = (event) => {
    const itemsRef = Firebase.database().ref("Events");
    const item = {
      lat: this.state.lat,
      lng: this.state.lng,
      title: this.state.title,
      decription: this.state.description,
      type: this.state.value,
    };
    console.log(item);
    itemsRef.push(item);
    alert(
      "LAT " +
        item.lat +
        "LNG " +
        item.lng +
        "title " +
        item.title +
        "type " +
        item.type +
        " desc" +
        item.decription
    );
    // this.setState({
    //   currentItem: "",
    //   username: "",
    // });
  };
  handleChange = (event) => this.setState({ value: event.target.value });
  handleLatChange(event) {
    this.setState({ lat: event.target.value });
    console.log(this.state);
  }
  handleLngChange(event) {
    this.setState({ lng: event.target.value });
    console.log(this.state);
  }
  handleTitleChange(event) {
    this.setState({ title: event.target.value });
    console.log(this.state);
  }
  handleDescChange(event) {
    this.setState({ description: event.target.value });
    console.log(this.state);
  }

  getData(b) {
    this.setState({ lat: b.lat });
    this.setState({ lng: b.lng });
  }

  render() {
    if (!Firebase.apps.length) {
      try {
        Firebase.initializeApp(firebaseConfig);
      } catch (err) {}
    }
    const { developers } = this.state;
    return (
      <div
        style={{
          width: "70%",
          position: "absolute",
          zIndex: "111",
          right: "15vw",
          backgroundColor: "white",
        }}
        className="container"
      >
        <button onClick={this.props.close}>X</button>
        <Map width={"90%"} height={"300px"} sendData={this.getData} />
        <div className="row"></div>
        <div className="row">
          <div className="col-xl-12">
            <form>
              <div className="form-row">
                <input type="hidden" ref="uid" />
                <div className="form-group col-md-6">
                  <label>Lat</label>
                  <input
                    className="form-control"
                    placeholder="Lat"
                    value={this.state.lat}
                    // onChange={this.handleLatChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Lng</label>
                  <input
                    className="form-control"
                    placeholder="Lng"
                    value={this.state.lng}
                    // onChange={this.handleLngChange}
                  />
                </div>

                <div>
                  <label>Title</label>
                  <input
                    className="form-control"
                    placeholder="Title"
                    value={this.state.Lat}
                    onChange={this.handleTitleChange}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <input
                    className="form-control"
                    placeholder="Description"
                    value={this.state.Lat}
                    onChange={this.handleDescChange}
                  />
                </div>
                <label>
                  Pick your favorite flavor:
                  <select value={this.state.value} onChange={this.handleChange}>
                    <option value="Sports">Sports</option>
                    <option value="Rec">Rec</option>
                    <option value="Education">Education</option>
                    <option value="Protest">Protest</option>
                  </select>
                </label>
              </div>
              <button
                onClick={this.handleSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
