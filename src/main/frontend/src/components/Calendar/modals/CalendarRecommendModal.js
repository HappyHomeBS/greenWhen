import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";

const CalendarRecommendModal = ({ visible, onCancel, region }) => {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const url = "/csv/recommend.csv";
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const reader = new FileReader();
        reader.onload = () => {
          const data = reader.result;
          setCsvData(data.split(/\r?\n|\r/));
        };
        reader.readAsText(new Blob([text], { type: "text/csv" }));
      })
      .catch((error) => console.error(error));
      console.log(csvData)

    }, []);

  const filteredData = csvData.filter((row) => {
    const cells = row.split(",");    
    return cells[4] === region;
  });

  const modifiedData = filteredData.map((row) => {
      const cells = row.split(",");
      return (
          <tr>
              {cells.map((cell, cellIndex) => {
                  if (cellIndex === 0 || cellIndex === 2) {
                      return <td key={cellIndex}>{cell}</td>;
                  }
                  return null;
              })}
          </tr>
      );
  });
    
  if (!visible) return null;
  return (
    <Modal
      show={visible}
      onHide={onCancel}
      size="mi"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            지역:{region}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody className="calendarTbody">
              {filteredData.map((row, index) => (
                <tr key={index}>
                    {row.split(",").map((cell, cellIndex) => (
                        <td key={cellIndex}>{cellIndex === 0 || cellIndex === 2  ? cell : null}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
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
