import React, {useReducer, useContext, useEffect} from 'react';
import CalendarModal from "./CalendarModal";
import calendarReducer from "./reducer/CalendarReducer";
import MakeCalendar from "../module/MakeCalendar";
import axios from 'axios';
import AuthContext from '../../../store/authContext';


const today = new Date()

// 초기 상태
const initialState = {
     year: today.getFullYear(),
     month: today.getMonth(),
     modal: {
         visible: false,
         targetdate: '',
     },
     schedule: []     
 };


const Calendar = () => {
    const [state, dispatch] = useReducer(calendarReducer, initialState)

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    // 날짜 관련
    const year = state.year;
    const month  = state.month;
    const yearMonth = year + "." + (month+1);
    const lastDate = parseInt(new Date(year, month+1, 0).getDate());
    const firstDay = parseInt(new Date(year, month, 1).getDay());

    // 일정
    const todo = state.schedule

    // Modal
    const visible = state.modal.visible
    const targetdate = state.modal.index

    // useEffect(() => {
    //     axios.get('/member/callProfile', {
    //       headers: {
    //         'Authorization': 'Bearer ' + token
    //       }
    //     })
    //       .then((res) => {
    //         const data = res.data;
    //         const URL = data.filepath
            
    //         console.log("주소", Image)
    //       });
    //   }, []);

    // Month 감소
    const onDecreases = () => {
        dispatch({ type: 'DECREMENT'})
    }

    // Month 증가
    const onIncreases = () => {
        dispatch({ type: 'INCREMENT'})
    }

    // Modal Active
    const changeVisible = (key) => {
        dispatch({ type: 'MODAL', value: key})
    }

    // 일정 입력
    const onConfirm = ({targetdate, todo, color, todos}) => {
        // 종료일정이 있는경우
        if (todos.length != 0) {                      
            const schedules = [];
            todos.map((item) => {                                    
                // targetdate: 날짜(시작일 ~ 종료일), todo: 일정, color: 표시color
                schedules.push({ targetdate: item, memo:todo, color: color });
                console.log('아이템', item)                
                dispatch({type: 'INSERT', index: item, todo:todo, color: color}) 
            })
            axios.post('/calendar/schedule', schedules, { headers: {
                'Authorization': 'Bearer ' + token
              } 
            })
            .then((res) => {
                const data = res.data;
                console.log("메모", data)
                data.map((item) => {  
                    console.log('아이템', item)                                                      
                    dispatch({type: 'INSERT', index: item.targetdate, todo:item.memo, color: item.color}) 
                })
            });     
            console.log(schedules)
        }
        else {
            // 일정이 하루만 입력된 경우
            const schedule = [];
            schedule.push({ targetdate: targetdate, memo:todo, color: color });
            
            axios.post('/calendar/schedule', schedule, { headers: {
                'Authorization': 'Bearer ' + token
              } 
            })
            .then((res) => {         
                console.log(res.data)
            });     
            console.log(schedule)
        }
        dispatch({ type: "MODAL"})
    }

    // 일정 입력 취소
    const onCancel = () => {
        dispatch({ type: "MODAL"})
    }


    return (
        <>
            <div className="Calendar">
                <div className="header">
                    <button className="move" onClick={onDecreases}>&lt;</button>
                    <p>{yearMonth}</p>
                    <button className="move" onClick={onIncreases}>&gt;</button>
                </div>
                <table className='table'>
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
                    {MakeCalendar({year, month ,firstDay, lastDate, changeVisible, todo, })}
                    </tbody>
                </table>                
                <CalendarModal targetdate= {targetdate} visible={visible} onConfirm={onConfirm} onCancel={onCancel}/>
            </div>
        </>
    )
}

export default React.memo(Calendar);
