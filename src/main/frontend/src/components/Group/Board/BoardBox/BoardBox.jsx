// # main/frontend/src/compoents/BoardBox/BoardBox.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BoardBox = (props) => {




    
    //<Link
    //   to = {"/page"}
    // state = {{
    //    no: props.no,
    // }}
    //>

    return(
    <>
    
        <Link
         to= {"/page"}
         state= {{ no: props.no, allowcomment : props.allowcomment }}
        >
            <div>
                <h5>{props.title}</h5>
            </div>
        </Link>
    </>
    )
}
export default BoardBox;