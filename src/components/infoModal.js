import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import React from "react";

function InfoModal(props) {
  const handleClose = () => props.toggleModal();
  const changeStatus = () => props.changeStatus();
  const CAR_STATUS = { 0: "Idle", 1: "En Route", 2: "Broken Down" };
  return (
    <div>
      <Modal show={props.visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.visible && props.carData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Current Status: {props.visible && CAR_STATUS[props.carData.status]}</Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button variant="success" size="sm" value="0" onClick={(e) => changeStatus(e)}>
              Idle
            </Button>
            <Button variant="warning" size="sm" value="1" onClick={(e) => changeStatus(e)}>
              En Route
            </Button>

            <Button variant="danger" size="sm" value="2" onClick={(e) => changeStatus(e)}>
              Broken Down
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default InfoModal;
