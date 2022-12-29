import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/authContext';


const ChangePassword = () => {

  let navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const exPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordAgainInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredExPassword = exPasswordInputRef.current!.value;
    const enteredNewPassword = newPasswordInputRef.current!.value;
    const enteredNewPasswordAgain = newPasswordAgainInputRef.current!.value;
    if (enteredNewPassword !== enteredNewPasswordAgain) {
      alert("Password Write Correct!");
      return;
    }
    console.log('change pw start!');
    authCtx.changePassword(enteredExPassword, enteredNewPassword);
    console.log(authCtx.isSuccess);
    if (authCtx.isSuccess) {
      alert("다시 로그인 하세요.")
      authCtx.logout();
      navigate("/", { replace: true });
    }
  }

  return (
    <form  onSubmit={submitHandler}>
      <div>
      <label htmlFor='exPassword'>Old Password</label>
        <input 
          type='password' 
          id='exPassword'
          minLength={4} 
          ref={exPasswordInputRef} 
        />
        <label htmlFor='newPassword'>New Password</label>
        <input 
          type='password' 
          id='newPassword'
          minLength={4} 
          ref={newPasswordInputRef}
        />
        <label htmlFor='newPassword'>New Password Again</label>
        <input 
          type='password' 
          id='newPasswordAgain'
          minLength={4}
          ref={newPasswordAgainInputRef} 
        />
      </div>
      <div>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export { ChangePassword };