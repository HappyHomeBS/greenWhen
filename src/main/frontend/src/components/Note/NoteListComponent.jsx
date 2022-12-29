import React, {useContext, Component} from 'react';
import * as NoteService from '../../service/NoteService.js';
import { useLocation, useParams, useNavigate} from 'react-router-dom'
import AuthContext from '../../store/auth-context.tsx';
import "../../css/Note.css"
// useParams 사용을 위해 함수 HOC 생성 
export const withRouter = (WrappedComponent) => (props) => {
    const params=useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const authCtx = useContext(AuthContext);
 
    var userId = authCtx.userObj.userid;
    var userNickName = authCtx.userObj.usernickname;
    var token = authCtx.token;
    return<WrappedComponent{...props} userId={userId} token = {token} params={params} navigate = {navigate} location={location}/>;
};


class NoteListComponent extends Component {
      
//생성자로 초기화하기(note:에 데이터 들어감)
    constructor(props) {
        super(props)
        this.state = {
            note: [],
            num: 1,
            paging: {},
            token:0,
            checkList:[],
            allCheck:false,
            checked:false
        };
        this.noteWrite = this.noteWrite.bind(this);
        this.noteSentList = this.noteSentList.bind(this)
    }

    // 컴포넌트 생성시 실행(값 세팅)
    componentDidMount(token) {
        var num=this.state.num;
        token = this.props.token;
        NoteService.GetNoteList(num, token).then((res) => {
            console.log(res.data);
            this.setState({
                note: res.data.noteList,
                num: res.data.pagingData.num,
                paging: res.data.pagingData,
             
            });
            console.log("didmount")
        });
        console.log(this.state)
    }
    //체크박스 

    checkBoxHandler(id, isChecked){ 
        var newList = [...this.state.checkList];
        if (isChecked) {
            newList.push(id);
            this.setState({
                checkList: newList
            })
        } else if (!isChecked && newList.includes(id)) {
            newList=newList.filter((element) => element !==id);
            this.setState({
                checkList: newList
            })
        }
        // console.log(newList)
    }
    checkHandler(target){
       this.setState({
        checked:true
       }) 
       this.checkBoxHandler(target.id, target.checked)
    };

    allCheckHandler(isChecked){
        const numbers = []
        this.state.note.map(
            note => numbers.push(note.no)
        )
        // console.log(numbers)
        if (isChecked) {
            this.setState({
                checkList: numbers,
                allCheck : true
            })
        } else {
            this.setState({
                checkList: [],
                allCheck: false
            })
        }
        const log = [...this.state.checkList]
        console.log(log)
    }
    //페이징 포함 리스트 호출
    
    listNote(num){
        console.log("pageNum : " + num);
        var token = this.props.token;
        NoteService.GetNoteList(num, token).then((res) => {
            console.log(res.data);
            this.setState({
                num: res.data.pagingData.num,
                paging: res.data.pagingData,
                note: res.data.noteList
            });
        });
        console.log(this.state)
    }
    
    // 쓰기 페이지 이동
    // history.push 사라지면서 navigate로 바뀜(hook이기 때문에 클래스에서 사용하려면 래퍼 필요)
    noteWrite() {
        this.props.navigate('/noteWrite')
    }

    noteRead(no) {
        this.props.navigate('/noteRead/'+no)
    }
    noteSentList(){
        this.props.navigate('/noteSentList/')
    }
    //이하
    //페이징 
    viewPaging() {
        const pageNums = [];
        for ( let i = this.state.paging.startPageNum; i<= this.state.paging.endPageNum; i++) {
            pageNums.push(i)
        }
        return (pageNums.map((page) => 
        <li className="page-item" key={page.toString()}>
            <a className="page-link" onClick= {() => this.listNote(page)}>{page}</a>
        </li>
        ));
    }

    isPagingPrev(){
        if(this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = { ()=> this.listNote((this.state.paging.num - 1) )} tabIndex="-1">이전</a>
                </li>
            );
        }
    }
    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = { ()=> this.listNote((this.state.paging.num +1))} tabIndex="-1">다음</a>
                </li>
            )
        }
    }
    isMoveToFirstPage() {
        if (this.state.num !==1){
            return ( 
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listNote(1)} tabIndex="-1">첫 페이지로</a>
                </li>
            )
        }
    }
    isMoveToLastPage() {
        if(this.state.paging.endPageNum !== this.state.paging.lastPage) {
            return (
                <li className="page-item">
                    <a className = "page-link" onClick = {() => this.listNote((this.state.paging.lastPage))} tabIndex="-1"> 마지막페이지로({this.state.paging.lastPage})</a>
                </li>
            )
        }
    }
  
    render() {
        return (
            <div clssName="note_list">
                <h2 className="text-center">받은 쪽지함</h2>
                    <div className ="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" className="note_checkbox" id="all_checkbox" onChange={(e)=>this.allCheckHandler(e.target.checked)}
                                    checked={this.state.checkList.length === this.state.note.length ? true : false}
                                    /> </th>
                                    <th style= {{display :"none"}}> 번  호 </th>
                                    <th> 제  목 </th>
                                    <th> 보낸사람</th>
                                    <th> 받은날짜</th>
                                    <th> 수신확인</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*반복되는 컴포넌트 렌더링 위해 map()사용  */}
                                {
                                    this.state.note.map(
                                        note =>
                                        <tr key = {note.no}>
                                            <td><input type="checkbox" id={note.no} className="note_checkbox" onChange={(e)=> this.checkBoxHandler(e.target.id, e.target.checked)}
                                            checked={this.state.checkList.includes(note.no)? true : false}
                                            /></td>
                                            <td style= {{display :"none"}}>{note.no}</td>
                                            <td> <a onClick = {() => this.noteRead(note.no)}>{note.title}</a></td>
                                            <td>{note.send}</td>
                                            <td>{note.time}</td>
                                            <td>{note.readCheckString}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style={{float:"right"}}>
                        <button className="btn btn-primary" onClick={this.noteWrite}>쪽지 보내기</button>
                        <button className="btn btn-primary" onClick={this.noteSentList.bind(this)} style={{marginLeft: "5px"}}>보낸쪽지함</button>
                    </div>
                    <div className="row">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                {
                                    this.isMoveToFirstPage()
                                }
                                {
                                    this.isPagingPrev()
                                }
                                {
                                    this.viewPaging()
                                }
                                {
                                    this.isPagingNext()
                                }
                                {
                                    this.isMoveToLastPage()
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
        );
    }
}
export default withRouter(NoteListComponent);