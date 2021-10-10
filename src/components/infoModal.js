import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import React from "react";

function InfoModal(props) {
  const handleClose = () => props.toggleModal();
  return (
    <div>
      <Modal show={props.visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Title!</Modal.Title>
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
    </div>
  );
}
export default InfoModal;
