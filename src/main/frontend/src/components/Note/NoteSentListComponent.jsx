import React, {Component } from 'react';
import * as NoteService from '../../service/NoteService.js';
import { withRouter } from './NoteListComponent';

class NoteSentListComponent extends Component {
//생성자로 초기화하기(note:에 데이터 들어감)
constructor(props) {
    super(props)
    this.state = {
        note: [],
        num: 1,
        paging: {}
    };
    this.noteWrite = this.noteWrite.bind(this);
    this.noteList = this.noteList.bind(this)
}

    // 컴포넌트 생성시 실행(값 세팅)
    componentDidMount(token) {
        var num=this.state.num;
        token = this.props.token;
        NoteService.noteSentList(num, token).then((res) => {
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
    
    listNote(num){
        console.log("pageNum : " + num);
        var token = this.props.token;
        NoteService.noteSentList(num, token).then((res) => {
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
    // history.push 사라지면서 navigate로 바뀜()
    noteWrite() {
        this.props.navigate('/noteWrite')
    }

    noteRead(no) {
        this.props.navigate('/noteRead/'+no)
    }
    noteList(){
        this.props.navigate('/note')
    }
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
            <div>
                <h2 className="text-center">보낸 쪽지함</h2>
                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th style= {{display :"none"}}> 번  호 </th>
                                <th> 제  목 </th>
                                <th> 받는사람</th>
                                <th> 보낸날짜</th>
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
                                        <td>{note.title}</td>
                                        <td>{note.recept}</td>
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
                    <button className="btn btn-primary" onClick={this.noteList.bind(this)}>받은쪽지함</button>
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
export default withRouter(NoteSentListComponent);