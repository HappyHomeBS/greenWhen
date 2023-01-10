/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component } from 'react';
import * as NoteService from '../../service/NoteService.js';
import { withRouter } from './NoteListComponent';


class NoteSearchComponent extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <form>
                    <select name = "option" >
                        <option value="send"> 보낸사람 </option>
                        <option value="title"> 제   목 </option>
                        <option value="content"> 내   용 </option>
                    </select>
                    <input type='text' maxLength='20' className='serch_input' name='search' placeholder='검색어를 입력하세요'></input>
                    <input type='submit' value='검색' className='search_submit'></input>
                </form>
            </div>
        );
    }
}
export default NoteSearchComponent;