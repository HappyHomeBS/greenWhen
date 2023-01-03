import axios from 'axios';
import React, { useContext, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/authContext';


const Calendar = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
 
  return (
    <div>
      <h2>달력</h2>      
    </div>
  );
}

export { Calendar };