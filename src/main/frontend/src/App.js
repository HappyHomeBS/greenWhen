import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NoteListComponent from './components/NoteListComponent';
import NoteWriteComponent from './components/NoteWriteComponent';
import NoteReadComponent from './components/NoteReadComponent';

function App() {
    return(
        <div>
            <Router>
                <header></header>
                <div className="Container">
                    {/* 업데이트 되면서 Switch 대신 Routes 사용 */}
                    <Routes> 
                        {/* 업데이트 되면서 component ={} -> element{<>/}로 사용*/}
                        <Route path="/" exact element = {<NoteListComponent/>}></Route>
                        <Route path="/note/:userId" element = {<NoteListComponent/>}></Route>
                        <Route path="/noteWrite" element = {<NoteWriteComponent/>}></Route>
                        <Route path="/noteRead/:no" element = {<NoteReadComponent/>}> </Route>
                    </Routes>
                </div>
                <footer></footer>
            </Router>
        </div>
    )
}
export default App;