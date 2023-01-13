// # Bulletin/frontend/src/pages/Bulletin.jsx

import { React, useEffect, useState } from "react"; 
import BoardList from "../components/BoardList/BoardList";
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

//this is 2023-01-04

const Bulletin = () => {
  const [data, setData] = useState("")
  const location = useLocation();
  const groupname = location.state.groupname;

  
  useEffect(() => {
  const getBoardList = async () => {
        console.log('1-1. getBoardList()');
        
        let response = await axios.get(`/api/board-list/${groupname}`);

          console.log('1-2. 이게 빈 값이 아니라면 백엔드 보고와라 Bulletin/response: ', response);
        setData(response.data.data);
        console.log('1-2-1 response.data : ', response.data);
        console.log('1-3 response.data.data : ', response.data.data);
    };

    getBoardList();
  }, [groupname])

  return (
    <>
       <Link to={"/create-board"} >
        <input type='button' value='게시글 작성하기'/>
       </Link>
       <BoardList data={data}/>
    </>
  );
};

export default Bulletin;


/*
This looks like a JavaScript file that is using the React framework to create a component called "Main."
 This component is responsible for rendering a list of items called "BoardList,"
 which is imported from another file called "BoardList.jsx."

The component has a state variable called "data" that is initialized to an empty string,
 and it uses the "useState" hook to allow this value to be updated.
  The component also has a "useEffect" hook,
   which is a function that is executed after the component is mounted.

Inside the "useEffect" hook, there is an async function called "getBoardList"
which makes an HTTP GET request to the "/api/board-list" endpoint using the axios library.
 The response data is then logged to the console
 and used to update the component's "data" state variable using the "setData" function.

Finally,
the component renders a link to another page called "create-board," as well as the "BoardList" component,
passing the "data" state variable as a prop.
*/