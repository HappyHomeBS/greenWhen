import React from "react";
import { Fragment, useContext, useState } from "react";
import { Member } from "../components/User/Admin/MemberList";
import Group from "../components/User/Admin/Group";
import { Note } from "../components/User/Admin/Note";

const ProfilePage = () => {
  const [member, setMember] = useState(true);
  const [group, setGroup] = useState(false);
  const [note, setNote] = useState(false);

  return (
    <Fragment>
      <button
        onClick={() => {
          setMember(false);
          setGroup(true);
          setNote(false);
        }}
      >
        소모임
      </button>
      <button
        onClick={() => {
          setMember(true);
          setGroup(false);
          setNote(false);
        }}
      >
        회원
      </button>
      <button
        onClick={() => {
          setMember(false);
          setGroup(false);
          setNote(true);
        }}
      >
        1:1문의
      </button>
      {member && <Member />}
      {group && <Group />}
      {note && <Note />}
    </Fragment>
  );
};

export default ProfilePage;
