import React, {useContext, useState} from "react";
import AuthContext from "../../store/authContext";

const CenterBox = (props) => {
    const [procontent, setProcontent] = useState(false);
    const { content } = props;

    if( props.parents === "announce" ){

    console.log('parents : ' , props.parents);
    
    

    return (

        <div>
             공지사항 | | {props.title}  || 관리자 
            <button onClick={() => procontent===false ? setProcontent(true) : setProcontent(false)}>*</button>
            {procontent && <h1>{content}</h1>}
        </div>
    ); }

    else if ( props.parents === "FAQ" ) {

    console.log('parents : ' , props.parents);

        return(
        
            <div>
                {props.tag} | | {props.title}  || 관리자 
                <button onClick={() => procontent===false ? setProcontent(true) : setProcontent(false)}>*</button>
                {procontent && <h1>  {content} </h1>}
            </div>
        );
    }
};

export default CenterBox;