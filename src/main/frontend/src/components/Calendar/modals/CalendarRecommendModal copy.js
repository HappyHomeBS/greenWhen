import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";

const CalendarRecommendModal = ({ visible, onCancel, region }) => {
  const [csvData, setCsvData] = useState([]);
  const [result, setResult] = useState();

  useEffect(() => {
    const url = "/csv/recommend.csv";
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        console.log('지역1', text)          
        const rows = text.split(/\r?\n|\r/);
        const rowsData = rows.map((row) => 
        row.split(',(?=([^"]*"[^"]*")*[^"]*$)', -1)
        //console.log('지역1.2', row)
        );
        console.log('지역1.2', rowsData)
           

        rowsData.map((item) => {                   
          console.log('지역1.5', item)        
          setResult(item.reduce((acc, item, index) => {
            acc[index+1] = item;
            return acc;
          }, {}));  

        });
        
        console.log('지역2', result)        
        setCsvData(rowsData);
      })
      .catch((error) => console.error(error));
  }, []);

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
          {csvData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {csvData[0].map((head, index) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {csvData.slice(1).filter((row,index)=>index === 0 || index === 2).map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, index) => (
                      <td key={index}>{cell.split(',(?=([^"]*"[^"]*")*[^"]*$)', -1)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Loading...</div>
          )}
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