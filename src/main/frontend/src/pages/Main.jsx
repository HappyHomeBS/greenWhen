import axios from "axios";
import React, { useEffect, useState, Link, useContext } from "react";
import GroupList from "../components/Group/ManageSide/GroupList/GroupList";
import GroupListForBoardList from "../components/Group/ManageSide/GroupList/GroupListForBoardList";
import CreateGroupModal from "../components/Group/Modals/CreateGroupModal";
import AuthContext from "../store/authContext";

const Main = () => {
    const [data, setData] = useState("");
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const [showModal, setShowModal] = useState(false);






    useEffect ( () => {
        const getGroupList = async () => {
            let response = await axios.get(`api/group-list/`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });

            if (!response.data.data || !response.data.data.length){
                return <div> 가입한 소모임이 없어요 </div>
              }else {
            
            setData(response.data.data);
              };
        };
        getGroupList();
    }, []);

    return(
        <>
            <button onClick={ () => setShowModal(true)}>Creat Group</button>
            {showModal && (
                <CreateGroupModal onClose={() => setShowModal(false)} />
            )}
            <GroupList data={data}/>


            <br />
            <br />
        <div>
            <GroupListForBoardList data={data} />
        </div>
          

        </>

    );
};

export default Main;