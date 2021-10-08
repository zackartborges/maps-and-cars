import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
    };
  }
  componentDidMount() {
    fetch("https://615f71edf7254d001706813e.mockapi.io/api/cars")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          cars: result,
        });
        const check = this.state.cars.map((car, index) => {
          return car.latitude;
        });
        console.log(check);
      });
  }

  displayCars = () => {
    return this.state.cars.map((car, index) => {
      return (
        <Marker
          position={{
            lat: car.latitude,
            lng: car.longitude,
          }}
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
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);

// export default MapContainer
