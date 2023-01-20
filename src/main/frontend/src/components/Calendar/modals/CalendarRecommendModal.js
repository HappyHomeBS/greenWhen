import React from "react";
import { Modal, Container } from "react-bootstrap";
import CSVReader from "react-csv-reader";

const CalendarRecommendModal = ({
  visible,
  onCancel,
  region, 
}) => {  
  if (!visible) return null;
  return (
    <Modal
    show={visible}
    onHide={onCancel}
      size="mi"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
      <CSVReader onFileLoaded={(data, fileInfo, originalFile) => console.dir(data, fileInfo, originalFile)} />
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            지역:{region}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <button className="choice" onClick={onCancel}>
            Cancel
          </button>
        </Modal.Footer>
      </Container>
    </Modal>
  );  
};

export default CalendarRecommendModal;
