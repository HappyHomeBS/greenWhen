import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NoteListComponent from './components/NoteListComponent';

function App() {
    return(
        <div>
            <Router>
                <header></header>
                <div className="Container">
                    {/* Switch는 업데이트 되면서 없어짐 */}
                    <Routes> 
                        {/*component 업데이트 되면서 element로 사용*/}
                        <Route path="/" exact element = {<NoteListComponent/>}></Route>
                        <Route path="/note/:userId" element = {<NoteListComponent/>}></Route>
                    </Routes>
                </div>
                <footer></footer>
            </Router>
        </div>
    )
}
export default App;