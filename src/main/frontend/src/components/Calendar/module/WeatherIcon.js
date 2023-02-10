import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import CalcWeather from "./CalcWeather";

const WeatherIcon = ({ year, month, regionNum }) => {
    const [csvData, setCsvData] = useState([]);
    
  // 지역 변경시 해당지역의 날씨 데이터 불러옴
  useEffect(() => {  
    const url = "/weather/"+regionNum+".csv";
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const reader = new FileReader();
        reader.onload = () => {
          const data = reader.result;
          const rows = data.split(/\r?\n|\r/);
          const rowsData = rows.map(row => row.split(',(?=(["]*"[""]*")*[""*$)', -1));
          const csvData = rowsData.splice(1)
          setCsvData(csvData);
        };
        reader.readAsText(new Blob([text], { type: "text/csv" }));
      })
      .catch((error) => console.error(error));
  }, [regionNum]);

  
  const result = [];  
  
  csvData.map((info) => {
    //console.log('info', info)
    const weatherData = info[0].split(',')       
    //console.log('weatherData', weatherData[2])
    const setDate = weatherData[2].replace(/\//g,'.')            
    //console.log('setDate', setDate)
    const infoDate = setDate.split('.')

    if (parseInt(infoDate[0]) === year && parseInt(infoDate[1]) === month) {
    const icon = CalcWeather({lowTemp:weatherData[3], highTemp:weatherData[4], rain:weatherData[5], dust:weatherData[11]})
    
    result.push({targetDate: setDate,
      icon: icon,
      lowTemp:weatherData[3], 
      highTemp:weatherData[4], 
      rain:weatherData[5], 
      dust:weatherData[11] 
      })
      
  }

});
//console.log('infomation', result)
 
    return result;
 }

export default WeatherIcon;