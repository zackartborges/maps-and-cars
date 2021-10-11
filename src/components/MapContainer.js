import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import InfoModal from "./InfoModal";

const ICON_PATH = "http://maps.google.com/mapfiles/kml/pal4";
const IDLE = `${ICON_PATH}/icon62.png`;
const EN_ROUTE = `${ICON_PATH}/icon31.png`;
const BROKEN_DOWN = `${ICON_PATH}/icon15.png`;
const CAR_STATUS_MAP = { 0: IDLE, 1: EN_ROUTE, 2: BROKEN_DOWN };
const API_URL = "https://615f71edf7254d001706813e.mockapi.io/api/cars";

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      showModal: false,
      // carStatus: { 0: IDLE, 1: EN_ROUTE, 2: BROKEN_DOWN },
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          cars: result,
        });
      });
  }

  changeStatus(e) {
    const { value } = e.target;
    this.setState((prevState) => {
      const updatedStatus = prevState.cars.map((car) => {
        if (car.id === e) {
          console.log("car:", car);
          return {
            ...car,
            status: value,
          };
        }
        return car;
      });
      return {
        cars: updatedStatus,
      };
    });
    console.log("completed", value);
  }

  // changeStatus(event) {
  //   const { value } = event.target;
  //   this.setState({
  //     status: value,
  //   });
  //   console.log("new status", this.state.status);
  // }

  displayCars = () => {
    return this.state.cars.map((car, index) => {
      return (
        <Marker
          position={{
            lat: car.latitude,
            lng: car.longitude,
          }}
          key={car.id}
          icon={CAR_STATUS_MAP[car.status]}
          onClick={() => this.toggleModal(car)}
        />
      );
    });
  };

  toggleModal(id) {
    this.setState({
      showModal: !this.state.showModal,
    });
    console.log("id:", id);
  }

  render() {
    const mapStyles = {
      width: "100%",
      height: "100%",
    };

    return (
      <div>
        <InfoModal visible={this.state.showModal} toggleModal={this.toggleModal} changeStatus={this.changeStatus} />
        <Map google={this.props.google} zoom={15} style={mapStyles} initialCenter={{ lat: 33.9519, lng: -83.3576 }}>
          {this.displayCars()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
