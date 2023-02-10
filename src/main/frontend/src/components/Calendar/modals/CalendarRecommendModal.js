import React, { useState, useEffect } from "react";
import { Modal, Container, Carousel } from "react-bootstrap";

const CalendarRecommendModal = ({ visible, onCancel, region }) => {
  const [csvData, setCsvData] = useState([]);
  const array = [];

  useEffect(() => {
    const url = "/csv/recommend.csv";
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const reader = new FileReader();
        reader.onload = () => {
          const data = reader.result;
          const rows = data.split(/\r?\n|\r/);
          //console.log('관광지1', rows)
          const rowsData = rows.map((row) =>
            row.split(',(?=(["]*"[""]*")*[""*$)', -1)
          );
          //console.log('관광지2', rowsData)
          rowsData.map((item) => {
            //console.log('관광지2', item)
            //const splitData = item[0].split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1)
            const splitData = item[0].split(",");
            //console.log('관광지3', splitData)
            //console.log('관광지6',splitData[4].includes(region[0].props.children));
            if (splitData[4]?.includes(region[0].props.children)) {
              array.push({
                place: splitData[0],
                address: splitData[1],
                info: splitData[2],
                infoDate: splitData[3],
                region: splitData[4],
              });
            }
          });
          console.log("관광지4", array);
          console.log("관광지5", region[0].props.children);
          setCsvData(array);
        };
        reader.readAsText(new Blob([text], { type: "text/csv" }));
      })
      .catch((error) => console.error(error));
  }, [region]);

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
          <Modal.Title id="contained-modal-title-vcenter">{region}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <Carousel variant="dark" slide={false}>
              {csvData.map((row, index) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/img/back.png"
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <tbody key={index}>
                      <tr>
                        <th>관광지명</th>
                      </tr>
                      <tr>
                        <td>{row.place}</td>
                      </tr>
                      <br />
                      <tr>
                        <th>소재지도로명주소</th>
                      </tr>
                      <tr>
                        <td>{row.address}</td>
                      </tr>
                      <br />
                      <tr>
                        <th>관광지소개</th>
                      </tr>
                      <tr>
                        <td>{row.info}</td>
                      </tr>
                    </tbody>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
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
