import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import InfoModal from "./InfoModal";

// const ICON_PATH = "http://maps.google.com/mapfiles/kml/pal4";
// const IDLE = `${ICON_PATH}/icon62.png`;
// const EN_ROUTE = `${ICON_PATH}/icon31.png`;
// const BROKEN_DOWN = `${ICON_PATH}/icon15.png`;
// const CAR_STATUS_MAP = { 0: IDLE, 1: EN_ROUTE, 2: BROKEN_DOWN };
// const MOCK_API_URL = "https://615f71edf7254d001706813e.mockapi.io/api/cars";
// const { io } = require("socket.io-client");
// const socket = io("http://localhost:3001", { transports: ["websocket"] });

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      showModal: false,
      activeCar: "",
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  callAPI() {
    fetch("http://localhost:3001")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  changeStatus(status) {
    console.log(this.state.activeCar);
    console.log(status);
    this.setState((prevState) => {
      const updatedStatus = prevState.cars.map((car) => {
        if (car.id === this.state.activeCar.id) {
          return {
            ...car,
            status,
          };
        }
        return car;
      });
      return {
        cars: updatedStatus,
      };
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  updateActiveCar(car) {
    this.setState({
      activeCar: car,
    });
  }

  // displayCars = () => {
  //   return this.state.cars.map((car, index) => {
  //     return (
  //       <Marker
  //         position={{
  //           lat: car.latitude,
  //           lng: car.longitude,
  //         }}
  //         key={car.id}
  //         icon={CAR_STATUS_MAP[car.status]}
  //         onClick={() => {
  //           this.openModal();
  //           this.updateActiveCar(car);
  //         }}
  //       />
  //     );
  //   });
  // };

  render() {
    const mapStyles = {
      width: "100%",
      height: "100%",
    };

    return (
      <div>
        <InfoModal
          visible={this.state.showModal}
          closeModal={this.closeModal}
          changeStatus={this.changeStatus}
          carData={this.state.activeCar}
        />
        <Map
          google={this.props.google}
          zoom={15}
          style={mapStyles}
          initialCenter={{ lat: 33.9519, lng: -83.3576 }}
        ></Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
