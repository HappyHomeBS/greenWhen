import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { BsCloudRainHeavy, BsBrightnessHigh, BsCloudSnow, BsFillCloudFill, BsFillCloudLightningRainFill, BsFillUmbrellaFill } from "react-icons/bs";
import CalcWeather from "./CalcWeather";

const WeatherIcon = ({ year, month, regionNum }) => {
  {/*날씨 아이콘 <BsCloudRainHeavy /><BsBrightnessHigh /><BsCloudSnow /><BsFillCloudFill /><BsFillCloudLightningRainFill /><BsFillUmbrellaFill />*/}
  const [csvData, setCsvData] = useState([]);
  

  const [lowTempScore, setLowTempScore] = useState(0);
  const [highTempScore, setHighTempScore] = useState(0);
  const [rainScore, setRainScore] = useState(0);
  const [dustScore, setDustScore] = useState(0);  
  
  useEffect(() => {
    console.log('start')
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
    //const icon = CalcWeather({lowTemp:weatherData[3], highTemp:weatherData[4], rain:weatherData[5], dust:weatherData[11]})
    //console.log('index', index)
    const lowTemp = parseInt(weatherData[3])
    const highTemp = parseInt(weatherData[4])
    const rain = parseInt(weatherData[5])
    const dust = parseInt(weatherData[11])
  
  const totalScore = (lowTempScore + highTempScore + rainScore + dustScore)/4 
  // console.log('index', index)
  // console.log('lowTemp', lowTemp)
  // console.log('highTemp', highTemp)
  // console.log('rain', rain)
  // console.log('dust', dust)
  // console.log('lowTempScore', lowTempScore)
  // console.log('highTempScore', highTempScore)
  // console.log('rainScore', rainScore)
  // console.log('dustScore', dustScore)
  // console.log('total', totalScore)


    if(lowTemp >= 5){
      result.push({targetDate: setDate,
        icon: <BsBrightnessHigh />,
        totalScore: totalScore })
      } else {
      result.push({targetDate: setDate,
        icon: <BsCloudSnow />,
        totalScore: totalScore })
    }
  }

});
console.log('infomation', result)
 
    return result;
 }

export default WeatherIcon;