// # Bulletin/frontend/src/pages/Bulletin.jsx

import { React, useEffect, useState, useContext } from "react"; 
import BoardList from "../components/Group/Board/BoardList/BoardList";
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Select from "react-select";
import AuthContext from "../store/authContext";

//this is 2023-01-04

const Bulletin = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userid = authCtx.userObj.userid;
  const [data, setData] = useState("")
  const location = useLocation();
  const groupname = location.state.groupname;
  //dropdown
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(location.state.groupname);
  const [groupLeader, setGroupLeader] = useState("");  

  //검색
  const [searchQuery, setSearchQuery] = useState("");
 // const [results, setResults] = useState([]);
  const navigate = useNavigate();

  console.log('그룹리더와 유저 아이디', groupLeader, userid);


  const handleSubmit = async (event) => {
      event.preventDefault();
   //   axios.get(`/api/searching-in-board/${searchQuery}`).then((response) => 
    //  {setResults(response.data.data);
   //   });


      const response = await axios.get(`/api/searching-in-board/${searchQuery}`, {
        headers: {
        'Authorization': 'Bearer ' + token
        }
        });
     // setResults(response.data.data);

 // const [results, setResults] = useState([]); 는 handleSubmit 밖에 있음
     //뭔뜻이냐면 handleSubmit 내에서 {results} 는 못씀. 그래서 콘솔 찍으면 안나온거 
  
      console.log('1. :', response.data.data);
      navigate("/searching-function", { state : { results: response.data.data }});

  };
  
  
  //내일 수정
  //selectedGroup === null 이면 {groupname} 으로 getBoardList 하는데 null 아니면
  //selectedGroup 으로 서치해서 그 값을 볼드 리스트로 다시 불러오면 됨. 
  
  useEffect(() => {

    const getBoardList = async () => {
        console.log('notnull', selectedGroup, 'groupname: ', groupname);
        let response = await axios.get(`/api/board-list/${selectedGroup}`, {
          headers: {
          'Authorization': 'Bearer ' + token
          }
          });
        setData(response.data.data);
        console.log('data->이거 boardlist:', data);
        console.log('data->이거 boardlist:', response.data.data);

      };
        
    const getGroupList = async() => {
      let response = await axios.get(`/api/group-list`, {
        headers: {
        'Authorization': 'Bearer ' + token
        }
        });
            setGroupList(response.data.data );
      
      console.log('1.grouplist : ', groupList);
      console.log('1.grouplist : ', JSON.stringify(groupList));
      console.log('1.grouplist: ', response.data.data);

    };

    const getGroupLeader = async() => {
      console.log('리더가져오기 작동')
      let response2 = await axios.get(`/api/whoisGroupLeader/${selectedGroup}`, {
        headers: {
        'Authorization': 'Bearer ' + token
        }
        });
      setGroupLeader(response2.data.data.groupleader);
      console.log('response.groupleader', groupLeader);
      

    }

    getGroupList();
    getBoardList();
    getGroupLeader();

  }, [selectedGroup] );

console.log('2.grouplist : ', groupList);
  

 const handleGroupChange = (event) => {
  setSelectedGroup(event.target.value);
 }

  return (
    <>
    <form>
      <label>
        Group :
        <select value={selectedGroup} onChange={handleGroupChange}>
          {groupList.map(group => (
            <option key = {group.groupname} 
                    value={group.groupname}>
              {group.groupname}
            </option>
          ))}
        </select>
      </label>
    </form>

    <div>
      {groupLeader === userid && <Link to ={"/manage-group"}
      state = {{
                  groupname : {selectedGroup},
                  groupleader : {groupLeader},
                  userid : {userid}
            }}>
      <input type='button' value = '소모임관리'/>
      </Link>}
    </div>


    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>

       <Link to={"/create-board"} 
            state = {{
                  groupname : {selectedGroup},
                  groupleader : {groupLeader}
            }}>
        <input type='button' value='게시글 작성하기'/>
       </Link>
       <BoardList data={data}/>
            <br />
            <br />
            <br />
       <div>
            <Link to ={"/willBeDeleted"} >
            {" "}
            |내정보보기  {" "}
            </Link>
      </div>
    
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