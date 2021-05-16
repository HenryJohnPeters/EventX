import mapboxgl, { Marker } from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
class MarkerCreator extends React.Component {
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

    for (let i = 0; i < this.props.data.length; i++) {
      console.log(this.props.data[i]);
      var a = Object.values(this.props.data[i]);
      console.log(a);
      for (let i = 0; i < a.length; i++) {
        console.log(a[i]);

        switch (a[i].type) {
          case "Education":
            var marker2 = new mapboxgl.Marker({
              color: "green",
              rotation: 45,
              draggable: true,
            })
              .setLngLat([parseFloat(a[i].lng), parseFloat(a[i].lat)])
              .setPopup(
                new mapboxgl.Popup() //add popups
                  .setHTML("<h3>" + "Protest" + "</h3>")
              )
              .addTo(this.props.map);

            var markerDiv = marker2.getElement();

            markerDiv.addEventListener("mouseenter", () =>
              marker2.togglePopup()
            );
            markerDiv.addEventListener("mouseleave", () =>
              marker2.togglePopup()
            );

            // code block
            break;
          case "Rec":
            var marker2 = new mapboxgl.Marker({ color: "red", rotation: 45 })
              .setLngLat([parseFloat(a[i].lng), parseFloat(a[i].lat)])
              .addTo(this.props.map);
            // code block
            break;
          case "Protest":
            var marker2 = new mapboxgl.Marker({ color: "red", rotation: 45 })
              .setLngLat([parseFloat(a[i].lng), parseFloat(a[i].lat)])
              .addTo(this.props.map);
            // code block
            break;
          default:
            var marker2 = new mapboxgl.Marker({
              color: "black",
              rotation: 45,
            })
              .setLngLat([parseFloat(a[i].lng), parseFloat(a[i].lat)])
              .addTo(this.props.map);
          // code block
        }
      }
    }
  }

  render() {
    return null;
  }
}

export default MarkerCreator;
