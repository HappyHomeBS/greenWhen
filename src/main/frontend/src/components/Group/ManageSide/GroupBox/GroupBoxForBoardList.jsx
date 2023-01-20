import React, { useEffect, useState, useContext } from "react";
//import BoardList from 
import BoardList from "../../Board/BoardList/BoardList";
import axios from "axios";
import AuthContext from "../../../../store/authContext";


const GroupBoxForBoardList = (props) => {
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [data, setData] = useState('');
    const only4 = true;

    useEffect(() => {
        const getBoardList = async () => {
              
              let response = await axios.get(`/api/board-list/${props.groupname}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
              setData(response.data.data);

            };
      
          getBoardList();
        }, [props.groupname])

    return(
        <>            
            <div>
                <h5> {props.groupname} </h5>
            </div>
            <div>
                <BoardList data = {data} only4={only4} />
            </div>
        </>
    )
}

export default GroupBoxForBoardList;