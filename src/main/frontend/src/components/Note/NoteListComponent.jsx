import React, {Component } from 'react';
import NoteService from '../../service/NoteService.js';
import { useLocation, useParams, useNavigate} from 'react-router-dom'

// useParams 사용을 위해 함수 HOC 생성 
export const withRouter = (WrappedComponent) => (props) => {
    const params=useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return<WrappedComponent{...props} params={params} navigate = {navigate} location={location}/>;
};


class NoteListComponent extends Component {
//생성자로 초기화하기(note:에 데이터 들어감)
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.params.userId,
            note: [],
            p_num: 1,
            paging: {}
        };
        this.noteWrite = this.noteWrite.bind(this);
        this.noteSentList = this.noteSentList.bind(this)
    }

    // 컴포넌트 생성시 실행(값 세팅)
    componentDidMount(userId) {
        userId=this.props.params.userId   
        // console.log(userId)
        NoteService.getNoteList(userId).then((res) => {
            console.log(res.data);
            this.setState({
                note: res.data,
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                notes: res.data.list
            });
        });
    }
    
    //페이징 포함 리스트 호출
    
    listNote(p_num){
        console.log("pageNum : " + p_num);
        NoteService.getNoteList(p_num).then((res) => {
            console.log(res.data);
            this.setState({
                p_num: res.data.pagingData.currentPageNum,
                paging: res.data.pagigngData,
                notes: res.data.list
            })
        })
    }
    //페이징 목록
    viewPaging() {
        const pageNums = [];
        for ( let i = this.state.paging.pageNumStart; i<= this.state.paging.pageNumEnd; i++) {
            pageNums.navigate(i)
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
                    <a classname="page-link" onClick = { ()=> this.listNote((this.state.paging.currentPageNum - 1) )} tabindex="-1">이전</a>
                </li>
            );
        }
    }
    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = { ()=> this.noteList((this.state.paging.currentPageNum +1))} tabIndex="-1">다음</a>
                </li>
            )
        }
    }
    isMoveToFirstPage() {
        if (this.state.p_num !=1){
            return ( 
                <li classNmae="page-item">
                    <a className="page-link" onClick = {() => this.listNote(1)} tabIndex="-1">첫 페이지로</a>
                </li>
            )
        }
    }
    isMoveToLastPage() {
        if(this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className = "page - link" onClick = {() => this.listBoard((this.state.paging.pageNumCountTotal))} tabIndex="-1"> LastPage({this.state.paging.pageNumCountTotal})</a>
                </li>
            )
        }
    }
    // 쓰기 페이지 이동
    // history.push 사라지면서 navigate로 바뀜()
    noteWrite() {
        console.log(this.props.params.userId)
        this.props.navigate('/noteWrite', {state: { userId: this.props.params.userId }})
    }

    noteRead(no) {
        this.props.navigate('/noteRead/'+no, {state: { userId: this.props.params.userId }})
    }
    noteSentList(){
        console.log(this.props.params.userId)
        this.props.navigate('/noteSentList/'+this.state.userId, {state: {userId: this.props.params.userId}})
    }
    render() {
        return (
            <div>
                <h2 className="text-center">받은 쪽지함</h2>
               
                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
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
                    <button className="btn btn-primary" onClick={this.noteSentList.bind(this)}>보낸쪽지함</button>
                </div>
            </div>
        );
    }
}
export default withRouter(NoteListComponent);