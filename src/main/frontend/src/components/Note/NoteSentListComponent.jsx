import React, {Component } from 'react';
import NoteService from '../../service/NoteService.js';
import { withRouter } from './NoteListComponent';

class NoteSentListComponent extends Component {
//생성자로 초기화하기(note:에 데이터 들어감)
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.params.userId,
            note: []
        };
        this.noteWrite = this.noteWrite.bind(this);
        this.noteList = this.noteList.bind(this);
    }

    // 컴포넌트 생성시 실행(값 세팅)
    componentDidMount(userId) {
        userId=this.props.params.userId   
        // console.log(userId)
        NoteService.noteSentList(userId).then((res) => {
            this.setState({note: res.data});
            console.log(this.state.note);
        });
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
    noteList(){
        console.log(this.props.params.userId)
        this.props.navigate('/note/'+this.state.userId, {state: {userId: this.props.params.userId}})
    }
    render() {
        return (
            <div>
                <h2 className="text-center">보낸</h2>
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
                                        <td>{note.recept}</td>
                                        <td>{note.time}</td>
                                        <td>{note.readCheck}</td>
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
            </div>
        );
    }
}
export default withRouter(NoteSentListComponent);