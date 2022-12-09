import React, {useEffect, Component } from 'react';
import NoteService from '../service/NoteService.js';

class NoteListComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            note: []
        }
    }

    componentDidMount() {
        NoteService.getNoteList().then((res) => {
            console.log(res.data);
            this.setState({note: res.data});
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
export default NoteListComponent;