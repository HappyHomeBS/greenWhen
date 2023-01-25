// # main/frontend/src/compoents/BoardBox/BoardBox.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../../store/authContext";
import BoardNoteModal from "../../Modals/BoardNoteModal";

const BoardBox = (props) => {
  const authCtx = useContext(AuthContext);
  const userid = authCtx.userObj.userid;
  const token = authCtx.token;
  const [boardNoteModalOn, setBoardNoteModalOn] = useState(false);

  const { Admin } = props;
  console.log("BoardBox/Admin: ,", Admin);
  //<Link
  //   to = {"/page"}
  // state = {{
  //    no: props.no,
  // }}
  //>

  return (
    <>
      <Link
        to={"/page"}
        state={{ no: props.no, allowcomment: props.allowcomment, Admin: Admin }}
      >
        <div>
          <h5>{props.title}</h5>
        </div>
      </Link>
      {/*본인의 경우 유저아이디만 뜨고 다른사람의 경우 클리하여 쪽지보내기 가능 */}
      <div>
        {props.tag} || {props.title} || {props.commentcount} ||{props.userid} ||{" "}
        {props.readcount} || {props.time}
      </div>

      {props.userid !== userid ? (
        <div onClick={() => setBoardNoteModalOn(true)}>{props.userid}</div>
      ) : null}
      {props.userid === userid ? <div>{props.userid}</div> : null}
      <BoardNoteModal
        visible={boardNoteModalOn}
        onCancel={() => setBoardNoteModalOn(false)}
        userid={userid}
        recept={props.userid}
        token={token}
        setBoardNoteModalOn={setBoardNoteModalOn}
      />
    </>
  );
};
export default BoardBox;
