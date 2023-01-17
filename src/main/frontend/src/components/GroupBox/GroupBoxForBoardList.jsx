import React, { useEffect, useState } from "react";
//import BoardList from 
import BoardList from "../BoardList/BoardList";

import axios from "axios";

const GroupBoxForBoardList = (props) => {
    const [data, setData] = useState('');
    const only4 = true;

    useEffect(() => {
        const getBoardList = async () => {
              
              let response = await axios.get(`/api/board-list/${props.groupname}`);
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