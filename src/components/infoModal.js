import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import React from "react";

function InfoModal(props) {
  const handleClose = () => props.toggleModal();
  return (
    <div>
      <Modal show={props.visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.visible && props.carData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Current Status: {props.visible && props.carData.status}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" size="sm" value="0" onClick={props.changeStatus}>
            Idle
          </Button>
          <Button variant="warning" size="sm" value="1" onClick={props.changeStatus}>
            En Route
          </Button>

          <Button variant="danger" size="sm" value="2" onClick={props.changeStatus}>
            Incapacitated
          </Button>

          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default InfoModal;
