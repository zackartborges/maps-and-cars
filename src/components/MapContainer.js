import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      carStatus: { 0: idle, 1: enRoute, 2: brokenDown },
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
          icon={this.state.carStatus[car.status]}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };
  render() {
    return (
      <Map google={this.props.google} zoom={15} style={mapStyles} initialCenter={{ lat: 33.9519, lng: -83.3576 }}>
        {this.displayCars()}
      </Map>
    );
  }
}
const mapStyles = {
  width: "100%",
  height: "100%",
};
const idle = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
const enRoute = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
const brokenDown = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);

// export default MapContainer
