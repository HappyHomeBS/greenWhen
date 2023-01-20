import axios from "axios";
import React, { useState, useContext } from "react";
import AuthContext from "../../../store/authContext";

function CreateGroupModal(props) {
    const [groupTitle, setGroupTitle] = useState('');
    const [groupDesc, setGroupDesc] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const userid = authCtx.userObj.userid;
    
    const tagList = ["공지","일반글"];

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!groupTitle || !groupDesc){
            setErrorMessage('enter a title and description for creatting');
            return;
        }

        try {
            const data = {
                groupname  : groupTitle,
                groupleader : userid,
                descript : groupDesc,
                tags : tagList
                
            };

         await axios.post("/api/creat-group", data, {
            headers: {
            'Authorization': 'Bearer ' + token
            }
            });
         window.location.reload();

        }catch( err ){
            console.log('yes' );
        }
    };

    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-button" onClick={props.onClose}>
                    닫기
                </button>
                <h2>Create a new Group</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="group-title">Group Title:</label>
                    <input 
                        type="text"
                        id="group-title"
                        value={groupTitle}
                        onChange={(event) => setGroupTitle(event.target.value)}
                    />
                    <br />
                    <label htmlFor="group-desc">Group Description:</label>
                    <input
                        type="text"
                        id="group-desc"
                        value={groupDesc}
                        onChange={(event) => setGroupDesc(event.target.value)}
                        />
                    <br />
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <button type="submit">Create Group</button>
                </form>
            </div>
        </div>
    );

}

export default CreateGroupModal;