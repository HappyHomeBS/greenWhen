import React, { useState, useEffect } from "react";
import { Modal, Container } from "react-bootstrap";
import { BsCloudRainHeavy, BsBrightnessHigh, BsCloudSnow, BsFillCloudFill, BsFillCloudLightningRainFill, BsFillUmbrellaFill } from "react-icons/bs";
import CalcWeather from "./CalcWeather";

const WeatherIcon = ({ year, month, regionNum }) => {
  {/*날씨 아이콘 <BsCloudRainHeavy /><BsBrightnessHigh /><BsCloudSnow /><BsFillCloudFill /><BsFillCloudLightningRainFill /><BsFillUmbrellaFill />*/}
  const [csvData, setCsvData] = useState([]);
  const Data = csvData.splice(1);

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
          setCsvData(rowsData);
        };
        reader.readAsText(new Blob([text], { type: "text/csv" }));
      })
      .catch((error) => console.error(error));
  }, [month]);

  
  const result = [];  
  
  Data.map((info, index) => {
    const weatherData = info[0].split(',')       
    const setDate = weatherData[2].replace(/\//g,'.')        
    const infoDate = setDate.split('.')

    if (parseInt(infoDate[0]) === year && parseInt(infoDate[1]) === month) {
    //const icon = CalcWeather({lowTemp:weatherData[3], highTemp:weatherData[4], rain:weatherData[5], dust:weatherData[11]})
    //console.log('index', index)
    const lowTemp = parseInt(weatherData[3])
    const highTemp = parseInt(weatherData[4])
    const rain = parseInt(weatherData[5])
    const dust = parseInt(weatherData[11])

    {/* 미세먼지의 경우 0~50: 좋음(5점), 51~100: 보통(4점), 101~250:나쁨(3점), 251~350:매우나쁨(2점), 351~500: 최악(1점)  */}
    if(dust >= 0 && dust <= 50 ){
      setDustScore(5)
  } else if (dust <= 100) {
      setDustScore(4)
  } else if (dust <= 250) {
      setDustScore(3)
  } else if (dust <= 350) {
      setDustScore(2)
  } else {
      setDustScore(1)
  }

  {/*최저 온도의 경우 10: 좋음(5점)  5:보통(4점) 0:나쁨(3점) -5:매우나쁨(2점) -10:최악(5점)  */}
  if(lowTemp >= 10) {
      setLowTempScore(5)
  } else if(lowTemp >= 5) {
      setLowTempScore(4)
  } else if(lowTemp >= 0) {
      setLowTempScore(3)
  } else if(lowTemp >= -5) {
      setLowTempScore(2)
  } else {
      setLowTempScore(1)
  }

  {/*최고 온도의 경우 15: 좋음(5점)  20:보통(4점) 25:나쁨(3점) 30:매우나쁨(2점) 35:최악(5점)  */}
  if(highTemp <= 15) {
      setHighTempScore(5)
  } else if(highTemp <= 20) {
      setHighTempScore(4)
  } else if(highTemp <= 25) {
      setHighTempScore(3)
  } else if(highTemp <= 30) {
      setHighTempScore(2)
  } else {
      setHighTempScore(1)
  }
  
  {/*일 강수량의 경우 없음: 좋음(5점) 5:보통(4점) 10이상: 나쁨(1점)*/}
  if(rain == 0 || rain == null) {
      setRainScore(5)
  } else if(rain <= 5) {
      setRainScore(4)
  } else if(rain > 6) {
      setRainScore(1)
  }
  
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