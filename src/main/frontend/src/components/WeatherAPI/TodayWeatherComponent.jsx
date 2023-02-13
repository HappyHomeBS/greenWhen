import axios from "axios";
import React, {useContext, useState, useEffect} from "react"
import AuthContext from '../../store/authContext';


export const TodayWeatherComponent = (props) => {
    const authCtx = useContext(AuthContext)
    const token = authCtx.token;
    const [TempCelcius, setTempCelcius] = useState("")
    const [Description, setDescription] = useState("")
    const [icon, setIcon] = useState("")
    const [iconUrl, setIconUrl] = useState("")
    const [city, setCity] = useState("")
    useEffect(()=> {
       
        getWeather();

    }, []);
    
    const getWeather = async () => {
       await(axios.get("/api/todayWeather", token)).then((res) => {
        //원본이 켈빈으로 넘어와서 섭씨로 바꿔줄것
        const kelbinTemp = res.data.main.temp;
        setTempCelcius((kelbinTemp-273.15).toFixed(1))
        setDescription(res.data.weather[0].main)
        setIcon(res.data.weather[0].icon);

        // 현재 날씨(구름, 비 등등) :  weather
        // 기온정보:  main
        const iconUrl = "http://openweathermap.org/img/w/"+res.data.weather[0].icon+".png"
        
        setIconUrl(iconUrl)
        setCity(res.data.name)

       })
       
    }

    ;
    
    return(
       <>
        <div>
            <div className="weatherBox" style = {{display:"block", width:"100%", height:"auto"}} >
                {city} 
                <br/>
                <img src={iconUrl}/>
                <br/>
                온도: {TempCelcius}
                <br/>
                {Description}
                <br/>
            </div>
        </div>
        
        </>
    )
}
export default TodayWeatherComponent;