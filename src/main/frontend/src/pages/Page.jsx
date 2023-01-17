import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Detail from "./Detail";
import CommentList from "../components/CommentList/CommentList";
import CommentForm from "../components/ForDetail/CommentForm";
import axios from "axios";


const Page = () => {
 
 const location = useLocation();  

 const no = location.state.no;
 console.log('Page.no:' , no );

 const noey = location.state;
 console.log('no없이', noey);

 const  allowcomment  = location.state.allowcomment;
 console.log('allowcomment :', allowcomment);

 const [data, setData] = useState("");
 const [fig, setFig] = useState(0);

  
  console.log('1. page의 fig보자 :' , fig);

  useEffect(() => {
    const getCommentList = async () => {

      let response = await axios.get(`/api/comment-list/${no}`);
      setData(response.data.data);
    }
    getCommentList();
    
  }, [fig]);    // [id, data]로 바꿔

  
  return (
      <div>
        <Detail no={no} />
        <CommentList data={data}
                      fig={fig} 
                      setFig={setFig} />
        {allowcomment === true &&<CommentForm contentNo={no}
                      fig={fig} 
                      setFig={setFig} />}
       
      </div>
    );
  }

  export default Page;