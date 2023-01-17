import axios from "axios";
import React, { useEffect, useState, Link } from "react";
import GroupList from "../components/GroupList/GroupList";
import GroupListForBoardList from "../components/GroupList/GroupListForBoardList";
import CreateGroupModal from "../components/Modals/CreateGroupModal";

const Main = () => {
    const [data, setData] = useState("");
    const userid = "damdam";
    console.log('userid: ', userid);
    const [showModal, setShowModal] = useState(false);






    useEffect ( () => {
        const getGroupList = async () => {
            let response = await axios.get(`api/group-list/${userid}`);

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