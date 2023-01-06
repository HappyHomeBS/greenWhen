/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component } from 'react';
import * as NoteService from '../../service/NoteService.js';
import * as NoteListComponent from './NoteListComponent';
import queryString from 'query-string'
import NoteSearchComponent from './NoteSearchComponent.jsx';
import NotePagingComponent from'./NotePagingComponent';

class NoteSentListComponent extends NotePagingComponent {
//생성자로 초기화하기(note:에 데이터 들어감)
constructor(props) {
    super(props)
    this.state = {
        note: []
        ,num: 1
        ,paging: {}
        ,checkList:[]
        ,allCheck:false
        ,search:null
        ,option:null
        ,paged:false
    };
    this.noteWrite = this.noteWrite.bind(this);
    this.noteList = this.noteList.bind(this)
}

    // 컴포넌트 생성시 실행(값 세팅)
    componentDidMount() {
         this.listNote(1)
    }
    
    listNote(num){
        var token = this.props.token;
        let option = queryString.parse(this.props.location.search).option
        let search = queryString.parse(this.props.location.search).search

        NoteService.noteSentList(num, option, search, token).then((res) => {
            console.log(res.data);
            this.setState({
                num: res.data.pagingData.num
                ,paging: res.data.pagingData
                ,note: res.data.noteList
                ,paged: true
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
        this.props.navigate('/noteRead/'+no, {sentList:true})
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
        const paged = this.state.paged;
        const num = this.state.num;
        const paging = this.state.paging;
        console.log("renderingnow")
        console.log(paging)
        
        return (
        <div clssName="noteList" style={{margin: "10%"}}>
            <h2 className="text-center">보낸 쪽지함</h2>
            <div className ="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style = {{display :"none"}}> 번  호 </th>
                            <th style = {{width : "50%", textAlign:"center"}}> 제  목 </th>
                            <th style = {{width : "10%", textAlign:"center"}}> 받는사람</th>
                            <th style = {{width : "20%", textAlign:"center"}}> 보낸날짜</th>
                            <th style = {{width : "10%", textAlign:"center"}}> 수신확인</th>
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
                <button className="btn btn-primary" onClick={this.noteList.bind(this)} style={{marginLeft: "5px"}}>받은쪽지함</button>
            </div>
                <NotePagingComponent 
                num={num}
                paging={paging}
                />
            <div>
                <NoteSearchComponent/>
            </div>
        </div>
    );
        }
}
export default NoteListComponent.withRouter(NoteSentListComponent);