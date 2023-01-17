import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-input-checkbox/lib/react-input-checkbox.min.css';
import { Checkbox } from "react-input-checkbox";
import Select from "react-select";


const CreateBoard = () => {
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileData, setFileData] = useState(null);
  const [allowComment, setAllowComment ] = useState({checked : true});
  const [isSubmitting, setIsSubmitting] = useState(false); // this part? 
  const [error, setError] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  //groupname 은 이전에서 받아오고
  const location = useLocation();
  const groupname = location.state.groupname.selectedGroup;
  const groupleader = location.state.groupleader.groupLeader;

  const navigate = useNavigate();
  const userid = "damdam";
  const readcount = 0;

  console.log('왜 여기선 오브잭트내로 계속가노???', groupname, groupleader, userid);
  // userid는 로그인기능 쓰면 좋겟다

 
//tag list가져오기 
  useEffect(() =>  {

    const getTagList = async () => {
      
      let response = await axios.get(`/api/tag-list/${groupname}/${groupleader}/${userid}`);
      setTagList(response.data.data);

      console.log('1.',response.data.data);
    };

    getTagList();

  }, [groupleader, groupname]);


 

  const resetInput = () => {
    setContent("");
    setTitle("");
    setFileData(null);
    };

  const handleChange = (event) => {
    setAllowComment({ ...allowComment, checked: false});
   //setCheck({ ...check, checked: event.target.checked});
  };

// read하는게 엄청 오래걸리므로 promise를 쓴다
// 안그러면 빈값 날라감
  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = [];
    const fileReaders = [];

    for (let i = 0; i < files.length; i++) {
      const fileReader = new FileReader();

      fileReaders.push(new Promise((resolve) => {
        fileReader.onload = function() {
          fileArray.push(fileReader.result);
          resolve();
        };
      }));
      fileReader.readAsDataURL(files[i]);
    }
    Promise.all(fileReaders).then(() => setFileData(fileArray));
 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const data = {
        title: title,
        userid: userid,
        content: content,
        readcount: readcount,
        groupname: groupname,
        files: fileData,
        allowcomment: allowComment.checked,
        tag : selectedTag
      };

      const response = await axios.post("/api/create-board", data);

      if (response.status >= 200 && response.status < 300) {
        alert("Board created successfully");
        //  navigate("/page", { state: { no: Number(no) } });
        navigate("/bulletin", { state  :  { groupname : groupname }});
      }
    } catch (err) {
      setError(err.message);
      console.log('여기는?' , {groupname});
      resetInput();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGroupTag = (event) => {
    setSelectedTag(event.target.value);
  }
  
    return (
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div>
        <Checkbox
          label = "i agree to the terms and conditions"          
          onChange={handleChange}
        > not allowed comment
          </Checkbox> 
      </div>

      <br />
      <br />
        <div>
            <label>
                Group :
                  <select value={selectedTag} onChange={handleGroupTag}>
                          {tagList.map(tag => (
                              <option key = {tag.tag} 
                                      value={tag.tag}>
                                        {tag.tag}
                              </option> 
                          ))}
                  </select>
            </label>
        </div>   
      <br />
      <br />

        <label>
          Title:
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Content:
          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Image:
          <input type="file" multiple onChange={handleFileChange} />
        </label>
        <br />
        <br />
        <button type="submit" disabled={isSubmitting}>
          Create board
        </button>
      </form>
    );
  };
  
  export default CreateBoard;