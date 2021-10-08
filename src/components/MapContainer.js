import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={8} style={mapStyles} initialCenter={{ lat: 33.9519, lng: -83.3576 }} />
    );
  }
}
const mapStyles = {
  width: "100%",
  height: "100%",
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyBtTDkWWy-pFZV53bizoVUgVON53dwLE2w",
})(MapContainer);

// export default MapContainer
