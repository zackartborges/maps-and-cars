import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import CarModal from "./CarModal";
export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      carStatus: { 0: idle, 1: enRoute, 2: brokenDown },
      show: false,
    };
  }
  // Pull data from API onMount
  componentDidMount() {
    fetch("https://615f71edf7254d001706813e.mockapi.io/api/cars")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          cars: result,
        });
      });
  }
  // Method that creates the markers across town
  displayCars = () => {
    return this.state.cars.map((car, index) => {
      return (
        <Marker
          position={{
            lat: car.latitude,
            lng: car.longitude,
          }}
          key={car.id}
          icon={this.state.carStatus[car.status]}
          onClick={() => console.log("You clicked me!", car.id)}
        />
      );
    });
  };
  render() {
    return (
      <Map google={this.props.google} zoom={15} style={mapStyles} initialCenter={{ lat: 33.9519, lng: -83.3576 }}>
        {this.displayCars()}
        <CarModal />
      </Map>
    );
  }
}

const mapStyles = {
  width: "100%",
  height: "100%",
};
// const idle = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
const idle = "http://maps.google.com/mapfiles/kml/pal4/icon62.png";
const enRoute = "http://maps.google.com/mapfiles/kml/pal4/icon31.png";
const brokenDown = "http://maps.google.com/mapfiles/kml/pal4/icon15.png";
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);

// export default MapContainer
// http://maps.google.com/mapfiles/kml/pal4/icon15.png
