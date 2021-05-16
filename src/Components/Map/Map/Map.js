import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
// import Markers from "../Markers/Markers";
// import Firebase from "firebase";
var cords;
class Mapped extends React.Component {
  constructor() {
    super();
    this.state = {
      map: null,
      selectedCoords: null,
      coords: "",
      test: "",
    };
    this.Test = this.Test.bind(this);
  }

  Test() {
    this.props.sendData(cords);
  }
  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxpY2VhdGQyZCIsImEiOiJjaXRwa2Z2aW0wMDBoMzNxZnhzMjRweWY4In0.2IxUsrVVbFKal0J8OZSeOg";
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [13.342817, 52.488648],
      zoom: 1.6,
    });

    map.on("click", function (e) {
      var coordinates = e.lngLat;
      cords = coordinates;

      // console.log(cords);
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML("you clicked here: <br/>" + coordinates)
        .addTo(map);
    });

    map.on("load", (...args) => {
      this.setState({ map });

      this.props.sendData("TEST");
    });
  }

  render() {
    const style = {
      height: this.props.height,
      width: this.props.width,
      position: this.props.postion,
    };

    return (
      <div
        onClick={this.Test}
        style={style}
        ref={(x) => (this.mapContainer = x)}
      >
        {this.state.map &&
          this.props.children &&
          React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
              map: this.state.map,
            })
          )}
      </div>
    );
  }
}

export default Mapped;
