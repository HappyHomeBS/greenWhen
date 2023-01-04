import axios from "axios";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarModal from "../../modals/CalendarModal";
import { Button } from "react-bootstrap";

const CalendarComponent = () => {
  const authCtx = useContext(AuthContext);
  const [value, setValue] = useState(new Date());
  const [calendarModalOn, setCalendarModalOn] = useState(false);

  const dayClick = useCallback(() => {
    

  }, [value]);

  const submitHandle = (event: React.FormEvent) => {
    event.preventDefault();
    const year = value.getFullYear();
    const month = (value.getMonth() + 1);
    const day = value.getDate();    
    setCalendarModalOn(true);      
  };

  return (
    <div>
      <CalendarModal
        show={calendarModalOn}
        onHide={() => setCalendarModalOn(false)} />
      <form onSubmit={submitHandle}>
        <Calendar onChange={setValue} value={value} onClickDay={dayClick} />
        <Button variant="outline-primary" type="submit" >등록</Button>        
      </form>
    </div>
  );
};

export { CalendarComponent };
