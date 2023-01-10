import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroupList from "../components/GroupList/GroupList";

const Main = () => {
    const [data, setData] = useState("");
    const userid = "damdam";
    console.log('userid: ', userid);

    useEffect ( () => {
        const getGroupList = async () => {
            let response = await axios.get(`api/group-list/${userid}`);
            setData(response.data.data);
        };
        getGroupList();
    }, []);

    return(
        <>
            <Link to={"/create-group"}>
            <input type='button' value='소모임 생성. 클릭해도 안됨 안만듦'/>
            </Link>
            <GroupList data={data}/>

        </>

    );
};

export default Main;