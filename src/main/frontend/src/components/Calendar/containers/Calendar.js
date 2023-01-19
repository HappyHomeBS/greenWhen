import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import CalendarModal from "../modals/CalendarModal";
import calendarReducer from "./reducer/CalendarReducer";
import MakeCalendar from "../module/MakeCalendar";
import axios from "axios";
import AuthContext from "../../../store/authContext";
import CalendarUpdateModal from "../modals/CalendarUpdateModal";
import CalendarMemoModal from "../modals/CalendarMemoModalList";
import { BsCloudRainHeavy, BsBrightnessHigh, BsCloudSnow, BsFillCloudFill, BsFillCloudLightningRainFill, BsFillUmbrellaFill } from "react-icons/bs";
import CalendarRegionModal from "../modals/CalendarRegionModal";
import Region from "../module/Region";

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
  const userNickname = authCtx.userObj.usernickname;

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
  const [calendarRegionModalOn, setCalendarRegionModalOn] = useState(false);

  // 지역
  const [selected, setSelected] = useState(sessionStorage.getItem("selected"));

  // 접속시 달력에 일정 입력(최초는 유저 달력으로 출력)
  useEffect(() => {
    if (!selected) {           
      sessionStorage.setItem("selected", 0);     
      sessionStorage.setItem("region", 0);     
    }
    dispatch({ type: "INITIALIZATIONSCHEDULE" });
    axios
      .get(
        "/calendar/getSchedules?region=" + sessionStorage.getItem("selected"),
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
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
  }, [selected]);

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

  // 지역선택에서 지역 선택시
  const onClickRegion = useCallback( ({ subRegion }) => {     
    console.log('서브',subRegion)   
    setSelected(subRegion.no)              
    sessionStorage.setItem("region", subRegion.no)    
    sessionStorage.setItem("selected", subRegion.no)    
  },[selected]
  );  
  

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
        schedules.push({
          targetdate: item,
          memo: todo,
          color: color,
          region: region,
        });
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

      schedule.push({
        targetdate: targetdate,
        memo: todo,
        color: color,
        region: region,
      });

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

  // 내가 쓴 메모 보기에서 일정 선택시
  const onClickSchedule = ({ schedule }) => {
    const date = schedule.targetdate
    const region = schedule.region
    dispatch({ type: "setYearMonth", date: date, region: region });
    sessionStorage.setItem("region", region)
    setSelected(region);
  };
  

  // 일정 입력 취소
  const onCancel = () => {
    dispatch({ type: "MODAL" });
  };

  return (
    <>
      <div className="Calendar">
        <div className="header">
        <BsCloudRainHeavy /><BsBrightnessHigh /><BsCloudSnow /><BsFillCloudFill /><BsFillCloudLightningRainFill /><BsFillUmbrellaFill />
          <button className="move" onClick={onDecreases}>
            &lt;
          </button>
          <p>{yearMonth}</p>
          <button className="move" onClick={onIncreases}>
            &gt;
          </button>
          <div>{Region({regionNumber:sessionStorage.getItem("region")})}</div>
          <button onClick={() => setCalendarMemoModalOn(true)}>
            내 메모 보기
          </button>
          <button onClick={() => setCalendarRegionModalOn(true)}>
            지역 선택
          </button>
          <button onClick={() => setCalendarRegionModalOn(true)}>
            관광지 추천
          </button>
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
          onClickSchedule={onClickSchedule}
          setCalendarMemoModalOn = {setCalendarMemoModalOn}
        />

        <CalendarRegionModal 
          visible={calendarRegionModalOn}
          onCancel={() => setCalendarRegionModalOn(false)}
          onClickRegion={onClickRegion}
          setCalendarRegionModalOn = {setCalendarRegionModalOn}          
          />
      </div>
    </>
  );
};

export default React.memo(Calendar);
