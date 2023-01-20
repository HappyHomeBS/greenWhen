import React from "react";
import { Link } from "react-router-dom";


const GroupBox = (props) => {
    
    return(
        <>
            <Link
                to = {"/bulletin"}
                state = {{
                    groupname : props.groupname,
                }}
            >

                <div>
                    <h5> {props.groupname} </h5>
                </div>
            </Link>
        </>
    )
}

export default GroupBox;