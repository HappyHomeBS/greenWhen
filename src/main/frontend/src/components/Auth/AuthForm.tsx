import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {

  const useridInputRef = useRef<HTMLInputElement>(null);
  const userpwInputRef = useRef<HTMLInputElement>(null);

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const enteredUserid = useridInputRef.current!.value;
    const enteredUserpw = userpwInputRef.current!.value;

    setIsLoading(true);
    authCtx.login(enteredUserid, enteredUserpw);
    setIsLoading(false);

    if (authCtx.isSuccess) {
      navigate("/", { replace: true });
    }
    
}

    return (
      <section>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='userid'>Your userid</label>
            <input type='userid' id='userid' required ref={useridInputRef}/>
          </div>
          <div>
            <label htmlFor="userpw">Your password</label>
            <input type='password' id='userpw' required ref={userpwInputRef}/>
          </div>
          <div>
            <button type='submit'>Login</button>
            {isLoading && <p>Loading</p>}
            <p>Create Account</p>
          </div>
        </form>
      </section>
    );
  }

export default AuthForm;