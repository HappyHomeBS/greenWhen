import React, {Component } from 'react';
import NoteService from '../service/NoteService.js';
import { useParams, useNavigate } from 'react-router-dom'

// useParams 사용을 위해 함수 HOC 생성 
export const withRouter = (WrappedComponent) => (props) => {
    const params=useParams();
    const navigate = useNavigate();
    return<WrappedComponent{...props} params={params} navigate = {navigate}/>;
};


class NoteListComponent extends Component {
//생성자로 초기화하기(note:에 데이터 들어감)
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.params.userId,
            note: []
        };
    }
// 컴포넌트 생성시 실행(값 세팅)
    componentDidMount(userId) {
        userId=this.props.params.userId   
        console.log(userId)
        NoteService.getNoteList(userId).then((NoteData) => {
        console.log(NoteData.data);
        this.setState({note: NoteData.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Note List</h2>
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
                            {/*  */}
                        <tbody>
                            {
                                this.state.note.map(
                                    note =>
                                    <tr key = {note.no}>
                                        <td style= {{display :"none"}}>{note.no}</td>
                                        <td>{note.title}</td>
                                        <td>{note.send}</td>
                                        <td>{note.time}</td>
                                        <td>{note.readCheck}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default withRouter(NoteListComponent);