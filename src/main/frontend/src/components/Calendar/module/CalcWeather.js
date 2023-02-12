import React from 'react';
import { BsEmojiLaughing, BsEmojiNeutral, BsEmojiFrown } from "react-icons/bs";

const CalcWeather = ({lowTemp, highTemp, rain, dust, month}) => {

    const avgTemp = (lowTemp + highTemp)/2

    {/* 미세먼지의 경우 0~50: 좋음(5점), 51~100: 보통(4점), 101~250:나쁨(3점), 251~350:매우나쁨(2점), 351~500: 최악(1점)  */}
    const getDustScore =(dust) => {
        if      (dust <= 50)  return 5;
        else if (dust <= 100) return 4;
        else if (dust <= 250) return 3;
        else if (dust <= 350) return 2;
        else return 1;
    }

    {/* 3,4,5월: 봄, 6,7,8:여름 9,10,11:가을, 12,1,2:겨울  (봄,가을), 여름, 겨울 */}    
    {/*평균 온도(봄,가을)의 경우 15: 좋음(5점)  10:보통(4점) 5:나쁨(3점) 0:매우나쁨(2점) -5:최악(5점)  */}
    {/*평균 온도(여름)의 경우 20: 좋음(5점)  23:보통(4점) 26:나쁨(3점) 32:매우나쁨(2점) 35:최악(5점)  */}
    {/*평균 온도(겨울)의 경우 5: 좋음(5점)  0:보통(4점) -5:나쁨(3점) -10:매우나쁨(2점) -15:최악(5점)  */}

    const getAvgTempScore = (avgTemp, month) => {
        if ((month >= 3 && month <= 5) || (month >= 9 && month <= 11)) {
            if (avgTemp >= 15) return 5;
            else if (avgTemp >= 10) return 4;
            else if (avgTemp >= 5) return 3;
            else if (avgTemp >= 0) return 2;
            else return 1;
          } else if (month >= 6 && month <= 8) {
            if (avgTemp <= 20) return 5;
            else if (avgTemp <= 23) return 4;
            else if (avgTemp <= 26) return 3;
            else if (avgTemp <= 32) return 2;
            else return 1;
          } else {
            if (avgTemp >= 5) return 5;
            else if (avgTemp >= 0) return 4;
            else if (avgTemp >= -5) return 3;
            else if (avgTemp >= -10) return 2;
            else return 1;
          }
    }

    
    {/* 일 강수량의 경우 없음: 좋음(5점) 5:보통(3점) 10이상: 나쁨(1점) */}
    const getRainScore = (rain) => {
        if(rain == 0 || rain == null) return 5
        else if(rain <= 5) return 4
        else return 2
    }

    const getScore = (dust, avgTemp, rain) => {
        const dustScore = getDustScore(dust);
        const avgTempScore = getAvgTempScore(avgTemp, month);
        const rainScore = getRainScore(rain);
      
        return (dustScore + avgTempScore + rainScore) / 3;
      };

    const score = getScore(dust, avgTemp, rain)
    //console.log('score', score)

    if (score > 4) return <BsEmojiLaughing />
    else if(score > 3) return <BsEmojiNeutral />
    else return <BsEmojiFrown />

}


export default CalcWeather;