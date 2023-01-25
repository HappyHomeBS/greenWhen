import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../../store/authContext";
import { Link } from 'react-router-dom';
import axios from "axios";
import CenterBox from "./CenterBox";

const FAQ = (props) => {

    const [lists, setList] = useState([]);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const isLogin = authCtx.isLoggedIn;
    const role = authCtx.userObj.role;
    const faq = "FAQ";

    //태그별 fag 보기
    const [selectedTag, setSelectedTag] = useState('');

    const filterByTag = (tag) => {
        setSelectedTag(tag);
        return lists.filter(list => list.tag === tag);
    }    
 
    //const filteredLists = selectedTag ? filterByTag(selectedTag) : lists; 무한랜더링되노
    const filteredLists = selectedTag ? lists.filter(list => list.tag === selectedTag) : lists;

    useEffect ( () =>{
        const getFAQList = async () => {
            let res = await axios({
                method : 'GET',
                url : `/direct/get-service-center/${2}`,
                headers: {'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token}
            });
            setList(res.data.data);
        };
        getFAQList();
    }, [])

    //보내줘야하는 taglist 만들어야댐

    const tagList = lists.reduce((acc, list) => {
        if (!acc.includes(list.tag)){
            acc.push(list.tag);
        }
        return acc;
    }, []).map(tag => ({value: tag, label: tag}));

    console.log('taglist? : ', tagList);




    const listsEliments = filteredLists.map(list => {

        return (
            <div key={list.no}>
                <CenterBox 
                    key = {list.no}
                    no = {list.no}
                    title ={list.title}
                    userid = {list.userid}
                    content = {list.content}
                    time = {list.time}
                    tag = {list.tag}
                    parents = {faq}
                    />
            </div>
        );
    });

    /*
        {isLogin && role ==='ROLE_ADMIN' &&<CreateAnnounceOrFAQ parents={faq} tagList={tagList}/>}

        /create-annouce-or-faq
    */


    return (


        <>
        <div>
            <button onClick={() => filterByTag('TAG예시')}>TAG예시1</button>
            <button onClick={() => filterByTag('TAG예시2')}>TAG예시2</button>
            <button onClick={() => filterByTag('TAG예시3')}>TAG예시2</button>
        </div>
        <div>{listsEliments}</div>

     <div>

        {isLogin && role === 'ROLE_ADMIN' && <Link to={"/create-annouce-or-faq"}
                        state={{ 
                            parents: faq, tagList: tagList }}>
                <input type='button' value='게시글 작성하기'/>
            </Link>}
        </div>   
      
        </>

    )
};

export default FAQ;