import axios from "axios";
import React, {useContext, useState, useEffect} from "react"
import AuthContext from '../../store/authContext';

export const WeekWeatherComponent = (props) => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [weekPredict, setWeekPredict] = useState([]);
    useEffect(()=>{
        getWeekWeather();
    }, []);
    
    const getWeekWeather = async ()=> {
        await(axios.get("/api/weekPredict", token)).then((res)=>{
            console.log(res.data)
            const weekData = [res.data.daily]
            console.log(weekData[0])
        setWeekPredict(weekData[0])  

        })
    }
    return (
        <>
        <div>
            <table>
                <thead>
                    <th> 번호 </th>
                </thead>
                <tbody>
            {
            weekPredict.map((weekPredict) =>
                <tr key={weekPredict.dt}>
                
                <td>{weekPredict.weather[0].description}</td>
                
                </tr>
            )}
            </tbody>
            </table>
        </div>
        </>
    )
}
export default WeekWeatherComponent;