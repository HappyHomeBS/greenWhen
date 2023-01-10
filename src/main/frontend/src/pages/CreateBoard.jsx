import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBoard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileData, setFileData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const damdam = "damdam";
  const readcount = 0;
  const damgroup = "damgroup";

  const resetInput = () => {
    setContent("");
    setTitle("");
    setFileData(null);
  };




// read하는게 엄청 오래걸리므로 promise를 쓴다
// 안그러면 빈값 날라감
  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = [];
    console.log('1. 클릭하면: ', files);
    const fileReaders = [];
    console.log('2. files.length? :', files.length);
    console.log('3. files[0] ???: ', files[0]);
    console.log('7이랑비교 setdata', {fileData});

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
 
    console.log('이젠 진짜 들어갓나', {fileData});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const data = {
        title: title,
        userid: damdam,
        content: content,
        readcount: readcount,
        groupname: damgroup,
        files: fileData,
      };

      const response = await axios.post("/api/create-board", data);

      if (response.status >= 200 && response.status < 300) {
        alert("Board created successfully");
        navigate("/", {});
      }
    } catch (err) {
      setError(err.message);
      resetInput();
    } finally {
      setIsSubmitting(false);
    }
  };
  
    return (
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
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