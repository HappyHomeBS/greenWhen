import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { BsCloudRainHeavy, BsBrightnessHigh, BsCloudSnow, BsFillCloudFill, BsFillCloudLightningRainFill, BsFillUmbrellaFill } from "react-icons/bs";
import CalcWeather from "./CalcWeather";

const WeatherIcon = ({ year, month, regionNum }) => {
  {/*날씨 아이콘 <BsCloudRainHeavy /><BsBrightnessHigh /><BsCloudSnow /><BsFillCloudFill /><BsFillCloudLightningRainFill /><BsFillUmbrellaFill />*/}
  const [csvData, setCsvData] = useState([]);
  const Data = csvData.splice(1);
  
  useEffect(() => {
    console.log('regionNum', regionNum)
    console.log('regionidx', year)
    console.log('regionidx', month)    
    const url = "/weather/"+regionNum+".csv";
    console.log('csvFile', url)
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const reader = new FileReader();
        reader.onload = () => {
          const data = reader.result;
          const rows = data.split(/\r?\n|\r/);
          const rowsData = rows.map(row => row.split(',(?=(["]*"[""]*")*[""*$)', -1));
          setCsvData(rowsData);
        };
        reader.readAsText(new Blob([text], { type: "text/csv" }));
      })
      .catch((error) => console.error(error));
  }, []);


  const result = [];
  
  Data.map((info, index) => {
    const weatherData = info[0].split(',')       
    const setDate = weatherData[2].replace(/\//g,'.')        
    const infoDate = setDate.split('.')

    if (parseInt(infoDate[0]) === year && parseInt(infoDate[1]) === month) {
    //const icon = CalcWeather({lowTemp:weatherData[3], highTemp:weatherData[4], rain:weatherData[5], dust:weatherData[11]})
    //console.log('index', index)
    const lowTemp = weatherData[3]
    if(lowTemp >= 5){
      result.push({targetDate: setDate,
        icon: <BsBrightnessHigh />})
      } else {
      result.push({targetDate: setDate,
        icon: <BsCloudSnow />})
    }
  }

    //console.log('infomation', result)
  });
 
    return result;
 }

export default WeatherIcon;