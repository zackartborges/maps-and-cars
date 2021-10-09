import React, { Component, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
function MapContainer() {
  // constructor() {
  //   super();
  //   this.state = {
  //     cars: [],
  //     carStatus: { 0: idle, 1: enRoute, 2: brokenDown },
  //     show: false,
  //   };
  // }
  const [cars, setCars] = useState([]);
  const [carStatus, setCarStatus] = useState({ 0: idle, 1: enRoute, 2: brokenDown });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Pull data from API onMount
  function componentDidMount() {
    fetch("https://615f71edf7254d001706813e.mockapi.io/api/cars")
      .then((res) => res.json())
      .then((result) => {
        setCars({
          cars: result,
        });
      });
  }

  // Method that creates the markers across town
  function displayCars() {
    return this.state.cars.map((car, index) => {
      return (
        <Marker
          position={{
            lat: car.latitude,
            lng: car.longitude,
          }}
          key={car.id}
          icon={this.state.carStatus[car.status]}
          onClick={handleShow}
        />
      );
    });
  }

  return (
    <Map google={this.props.google} zoom={15} style={mapStyles} initialCenter={{ lat: 33.9519, lng: -83.3576 }}>
      {displayCars()}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Map>
  );
}

const mapStyles = {
  width: "100%",
  height: "100%",
};

const idle = "http://maps.google.com/mapfiles/kml/pal4/icon62.png";
const enRoute = "http://maps.google.com/mapfiles/kml/pal4/icon31.png";
const brokenDown = "http://maps.google.com/mapfiles/kml/pal4/icon15.png";
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);

// export default MapContainer
// http://maps.google.com/mapfiles/kml/pal4/icon15.png
