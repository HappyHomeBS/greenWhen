import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";

const CreateAccountForm = () => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const useridInputRef = useRef<HTMLInputElement>(null);
  const userpwInputRef = useRef<HTMLInputElement>(null);
  const usernicknameInputRef = useRef<HTMLInputElement>(null);
  const useremailInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredUserid = useridInputRef.current!.value;
    const enteredUserpw = userpwInputRef.current!.value;
    const enteredUsernickname = usernicknameInputRef.current!.value;
    const enteredUseremail = useremailInputRef.current!.value;

    authCtx.signup(
      enteredUserid,
      enteredUserpw,
      enteredUsernickname,
      enteredUseremail
    );

    if (authCtx.isSuccess) {
      return navigate("/", { replace: true });
    }
  };

  return (
    <section>
      <h1>Create Account</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="userid">Your userid</label>
          <input type="userid" id="userid" required ref={useridInputRef} />
        </div>
        <div>
          <label htmlFor="userpw">Your password</label>
          <input type="password" id="userpw" required ref={userpwInputRef} />
        </div>
        <div>
          <label htmlFor="usernickname">Your nickname</label>
          <input
            type="text"
            id="usernickname"
            required
            ref={usernicknameInputRef}
          />
        </div>
        <div>
          <label htmlFor="useremail">Your email</label>
          <input type="text" id="useremail" required ref={useremailInputRef} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default CreateAccountForm;
