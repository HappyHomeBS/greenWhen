import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NoteListComponent from './components/NoteListComponent';

function App() {
    return(
        <div>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" exact component = {NoteListComponent}></Route>
                        <Route path="/note/test2" component = {NoteListComponent}></Route>
                    </Routes>
                </div>
            </Router>
        </div>
    )
}
export default App;