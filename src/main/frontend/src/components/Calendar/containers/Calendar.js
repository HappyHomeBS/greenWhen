import React, { useReducer, useContext, useEffect, useState, useCallback } from "react";
import CalendarModal from "./CalendarModal";
import calendarReducer from "./reducer/CalendarReducer";
import MakeCalendar from "../module/MakeCalendar";
import axios from "axios";
import AuthContext from "../../../store/authContext";
import CalendarUpdateModal from "./CalendarUpdateModal";
import CalendarMemoModal from "./CalendarMemoModal";

const today = new Date();

// 초기 상태
const initialState = {
  year: today.getFullYear(),
  month: today.getMonth(),
  modal: {
    visible: false,
    targetdate: "",
  },
  schedule: [],
};

const Calendar = () => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  
  // 유저 정보
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userNickname = authCtx.userObj.usernickname

  // 날짜 관련
  const year = state.year;
  const month = state.month;
  const yearMonth = year + "." + (month + 1);
  const lastDate = parseInt(new Date(year, month + 1, 0).getDate());
  const firstDay = parseInt(new Date(year, month, 1).getDay());

  // 일정
  const todo = state.schedule;

  // Modal
  const visible = state.modal.visible;
  const targetdate = state.modal.index;
  const [calendarUpdateModalOn, setCalendarUpdateModalOn] = useState(false);  
  const [calendarMemoModalOn, setCalendarMemoModalOn] = useState(false);  

  // 지역
  const [selected, setSelected] = useState(sessionStorage.getItem('selected'));  

  useEffect(() => {       
    dispatch({type: 'INITIALIZATIONSCHEDULE'})
    axios
      .get("/calendar/getSchedules?region="+sessionStorage.getItem('selected'), {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {     
        const data = res.data;
        console.log("메모", data);
        data.map((item) => {
          console.log("아이템", item);          
          dispatch({
            type: "INSERT",
            index: item.targetdate,
            todo: item.memo,
            color: item.color,
            no: item.no,
            region: item.region,
          });
        });
      });      
  }, [sessionStorage.getItem('selected')]);

  // Month 감소
  const onDecreases = () => {
    dispatch({ type: "DECREMENT" });
  };

  // Month 증가
  const onIncreases = () => {
    dispatch({ type: "INCREMENT" });
  };

  // Modal Active
  const changeVisible = (key) => {
    dispatch({ type: "MODAL", value: key });
  };

  //지역 선택
  const selectChange = useCallback((e) => {    
    setSelected(e.target.value);
    sessionStorage.setItem('selected', e.target.value);
    console.log('지역번호:',selected)
  }, [selected])


  // 일정 입력
  const onConfirm = ({ targetdate, todo, color, todos, region }) => {
    console.log("날짜", targetdate);
    console.log("일정", todo);
    console.log("컬러", color);
    console.log("지역", region);

    if (todos.length != 0) {
      const schedules = [];

      todos.map((item) => {
        // targetdate: 날짜(시작일 ~ 종료일), todo: 일정, color: 표시color
        schedules.push({ targetdate: item, memo: todo, color: color, region: region });
      });

      axios
        .post("/calendar/saveSchedule", schedules, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          const data = res.data;
          console.log("메모", data);
        });

      console.log(schedules);
    } else {
      // 일정이 하루만 입력된 경우
      const schedule = [];

      schedule.push({ targetdate: targetdate, memo: todo, color: color, region: region });

      axios
        .post("/calendar/saveSchedule", schedule, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
        });

      console.log(schedule);
    }
    window.location.reload();
    dispatch({ type: "MODAL" });
  };

  const onClickSchedule = ({ targetdate, todo, color, todos, region }) => {

  }

  // 일정 입력 취소
  const onCancel = () => {
    dispatch({ type: "MODAL" });
  };

  return (
    <>
      <div className="Calendar">
        <div className="header">
          <button className="move" onClick={onDecreases}>
            &lt;
          </button>
          <p>{yearMonth}</p>
          <button className="move" onClick={onIncreases}>
            &gt;
          </button>
          <select onChange={selectChange} value={sessionStorage.getItem('selected')}>
            <option value={0}>{userNickname}</option>
            <option value={108}>서울</option>
            <option value={159}>부산</option>
          </select>
          <button onClick={() => setCalendarMemoModalOn(true)}>내 메모 보기</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <td>Sun</td>
              <td>Mon</td>
              <td>Tue</td>
              <td>Wed</td>
              <td>Thu</td>
              <td>Fri</td>
              <td>Sat</td>
            </tr>
          </thead>
          <tbody>
            {MakeCalendar({
              year,
              month,
              firstDay,
              lastDate,
              changeVisible,
              todo,
              setCalendarUpdateModalOn,              
              onCancel,
            })}
          </tbody>
        </table>        
        <CalendarModal
          visible={visible}
          onCancel={onCancel}
          onConfirm={onConfirm}
          targetdate={targetdate}
          region={selected}
        />
        <CalendarUpdateModal
          visible={calendarUpdateModalOn}
          onCancel={() => setCalendarUpdateModalOn(false)}
          targetdate={targetdate}
          todo={todo}
        />
        <CalendarMemoModal
          visible={calendarMemoModalOn}
          onCancel={() => setCalendarMemoModalOn(false)}
          targetdate={targetdate}
          todo={todo}
          token={token}
          onClickSchedule = {onClickSchedule}
          />          
      </div>
    </>
  );
};

export default React.memo(Calendar);
