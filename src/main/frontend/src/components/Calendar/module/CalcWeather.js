import React,{ useState } from 'react';
import { BsCloudRainHeavy, BsBrightnessHigh, BsCloudSnow, BsFillCloudFill, BsFillCloudLightningRainFill, BsFillUmbrellaFill } from "react-icons/bs";

const CalcWeather = ({lowTemp, highTemp, rain, dust, month}) => {
    console.log('lowTemp', lowTemp)
    console.log('highTemp', highTemp)
    console.log('rain', rain)
    console.log('dust', dust)

    const [lowTempScore, setLowTempScore] = useState(0);
    const [highTempScore, setHighTempScore] = useState(0);
    const [rainScore, setRainScore] = useState(0);
    const [dustScore, setDustScore] = useState(0);
    console.log("lowTempScore", lowTempScore)
    console.log("highTempScore", highTempScore)
    console.log("rainScore", rainScore)
    console.log("dustScore", dustScore)

    {/*날씨 아이콘 <BsCloudRainHeavy /><BsBrightnessHigh /><BsCloudSnow /><BsFillCloudFill /><BsFillCloudLightningRainFill /><BsFillUmbrellaFill />*/}
    const result = [];

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

    {/* 3,4,5월: 봄, 6,7,8:여름 9,10,11:가을, 12,1,2:겨울  (봄,가을), 여름, 겨울 */}    
    {/*평균 온도(봄,가을)의 경우 15: 좋음(5점)  10:보통(4점) 5:나쁨(3점) 0:매우나쁨(2점) -5:최악(5점)  */}
    {/*평균 온도(여름)의 경우 20: 좋음(5점)  23:보통(4점) 26:나쁨(3점) 32:매우나쁨(2점) 35:최악(5점)  */}
    {/*평균 온도(겨울)의 경우 5: 좋음(5점)  0:보통(4점) -5:나쁨(3점) -10:매우나쁨(2점) -15:최악(5점)  */}

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

    
    {/*최고 온도(봄,가을)의 경우 15: 좋음(5점)  10:보통(4점) 5:나쁨(3점) 0:매우나쁨(2점) -5:최악(5점)  */}
    {/*최고 온도(여름)의 경우 15: 좋음(5점)  17:보통(4점) 20:나쁨(3점) 23:매우나쁨(2점) 25:최악(5점)  */}
    {/*최고 온도(겨울)의 경우 10: 좋음(5점)  5:보통(4점) 0:나쁨(3점) -5:매우나쁨(2점) -10:최악(5점)  */}
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
    
    {/* 일 강수량의 경우 없음: 좋음(5점) 5:보통(3점) 10이상: 나쁨(1점) */}
    if(rain == 0 || rain == null) {
        setRainScore(5)
    } else if(rain <= 5) {
        setRainScore(4)
    } else if(rain > 6) {
        setRainScore(1)
    }

    const totalScore = (lowTempScore + highTempScore + rainScore + dustScore)/4 

    if (totalScore > 2.5) {
        return <BsBrightnessHigh />
    } else if(totalScore > 0) {
        return <BsCloudRainHeavy />
    } 

}


export default CalcWeather;