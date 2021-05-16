import mapboxgl, { Marker } from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
class LayerCreator extends React.Component {
  componentDidMount() {
    this.props.map.addSource(this.props.id, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: this.props.coords,
        },
      },
    });

    this.props.map.addLayer({
      id: `${this.props.id}-layer`,
      type: "circle",
      source: this.props.id,
      paint: {
        "circle-radius": 15,
        "circle-color": this.props.color,
      },
    });
  }

  render() {
    return null;
  }
}
class TestLayer2 extends React.Component {
  componentDidMount() {
    this.props.map.addSource(this.props.id, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: this.props.coords,
        },
      },
    });

    this.props.map.addLayer({
      id: `${this.props.id}-layer`,
      type: "circle",
      source: this.props.id,
      paint: {
        "circle-radius": 15,
        "circle-color": this.props.color,
      },
    });
  }

  render() {
    return null;
  }
}

export default LayerCreator;
