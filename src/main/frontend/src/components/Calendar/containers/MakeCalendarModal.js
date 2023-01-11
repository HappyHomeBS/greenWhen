import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useContext,
} from "react";
import { Modal, Container } from "react-bootstrap";
import axios from "axios";
import Picker from "../component/Picker";
import Style from "../module/Style";
import ModalReducer from "./reducer/ModalReducer";
import CalcDate from "../module/CalcDate";
import AuthContext from "../../../store/authContext";

const MakeCalendarModal = ({
  targetdate,
  visible,
  onConfirm,
  onCancel,
  todo,
  data
}) => {
  /*  console.log('MakeCalendarModal:', 'data:', data)
    console.log('MakeCalendarModal:', 'todo:', todo)
    console.log('MakeCalendarModal:', 'targetdate:', targetdate)
    console.log('MakeCalendarModal:', 'schedule:', Schedule)
    console.log('MakeCalendarModal:', 'visible:', visible)
    console.log('MakeCalendarModal:', 'onConfirm:', onConfirm)
    console.log('MakeCalendarModal:', 'onCancel:', onCancel)*/
  const initialState = {
    color: "",
    todos: "",
    checked: false,
    date: "",
  };

  const [state, dispatch] = useReducer(ModalReducer, initialState);
  const [memo, setMemo] = useState([]);
  const memos = [];
  const [newMemo, setNewMemo] = useState('');

  const color = state.color;
  const check = state.checked;
  const end = state.date;
  const info = todo[targetdate];
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      onConfirm({ targetdate, todo });
      dispatch({ type: "CHANGE", value: "" });
    }
  };

  // 초기화
  const Initialization = () => {
    dispatch({ type: "INITIALIZATION" });
  };

  // 색상 변경
  const changeColor = (color) => {
    dispatch({ type: "COLOR", value: color });
  };

  // 일정
  const onChange = useCallback((e) => {    
    setMemo(e.target.value)
  }, []);
  
  const addMemo=()=>{
    const inputValues = [...memo];
    inputValues.push(newMemo);
    setMemo( inputValues );
  }


  // 일정 종료일
  const onTodos = useCallback((e) => {
    dispatch({ type: "TODOS", value: e.target.value });
  }, []);

  // 입력 취소
  const cancel = () => {
    onCancel();
    Initialization();
  };

  // 삭제
  const remove = () => {
    // 선택된 목록 가져오기
    const query = 'input[name="info"]:checked';
    const selectedEls = document.querySelectorAll(query);

    // 선택된 목록에서 value 찾기
    let result = [];
    selectedEls.forEach((el) => {
      const data = el.value.split(",");
      result.push({ targetdate: targetdate, memo: data[0], color: data[1], no: data[2] });
    });
    console.log(result);

    // 삭제
    axios.post("/calendar/deleteSchedules", result, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    window.location.reload();
  };

  // 수정
  const update = () => {
    // 선택된 목록 가져오기       
    const inputElements = document.querySelectorAll("input[name='memo']:checked");
    const values = [];
    for (let input of inputElements) {
        const value1 = input.getAttribute("value1");
        const value2 = input.getAttribute("value2");
        values.push({value1, value2});
    }
    const exData = values[0].value1
    console.log('exdata', exData)
    

    // 선택된 목록에서 value 찾기
    let result = [];
    values.forEach((el) => {
      console.log('데이터1',el)
      const data = el.value1.split(",");
      const newMemo = el.value2;
      result.push({ targetdate: targetdate, exMemo: data[0], newMemo: newMemo, color: data[1], no: data[2] });
    });
    console.log('결과',result);

     //수정
    //  axios.post('/calendar/deleteSchedules', result, {
    //      headers: {
    //        'Authorization': 'Bearer ' + token
    //      }
    //    })
    //    window.location.reload();
   };

  if (!visible) return null;
  return (
    <Modal
      show={visible}
      onHide={onCancel}
      size="mi"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {targetdate}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {info.map((info) => {
              return (
                <tr key={info}>
                  <span>삭제</span><input name="info" type="checkbox" value={info} />
                  <span>&nbsp;수정</span><input name="memo" type="checkbox" value1={info} value2={memo} />
                  <td>일정: &nbsp;</td>
                  <td>
                    <input                      
                      type="text"
                      placeholder={info[0]}
                      onChange={onChange}                      
                    ></input>
                  </td>
                  <div style={Style(info[1])} className="custom-check-box">
                    {" "}
                  </div>
                </tr>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="choice" onClick={update}>
            수정
          </button>
          <button className="choice" onClick={remove}>
            삭제
          </button>
          <button className="choice" onClick={cancel}>
            취소
          </button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
};

export default MakeCalendarModal;
