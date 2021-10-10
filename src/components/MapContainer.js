import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      carStatus: { 0: idle, 1: enRoute, 2: brokenDown },
      show: false,
    };
    this.changeStatus = this.changeStatus.bind(this);
  }
  // Pull data from API onMount

  // Method that creates the markers across town
  componentDidMount() {
    fetch("https://615f71edf7254d001706813e.mockapi.io/api/cars")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          cars: result,
        });
      });
  }
  // believe I need to implement componentDidUpdate to reload page to show updated status?
  changeStatus(e) {
    this.setState((prevState) => {
      const updatedStatus = prevState.cars.map((car) => {
        if (car.id === e) {
          return {
            ...car,
            // attempt to change status to zero due to lack of modal/buttons
            status: 0,
          };
        }
        return car;
      });
      return {
        cars: updatedStatus,
      };
    });
    console.log("completed", e);
  }

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
          // calls car.status to allow for direct manipulation of status?
          onClick={() => this.changeStatus(car.status)}
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
// const idle = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
const idle = "http://maps.google.com/mapfiles/kml/pal4/icon62.png";
const enRoute = "http://maps.google.com/mapfiles/kml/pal4/icon31.png";
const brokenDown = "http://maps.google.com/mapfiles/kml/pal4/icon15.png";
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);

// export default MapContainer
// http://maps.google.com/mapfiles/kml/pal4/icon15.png
