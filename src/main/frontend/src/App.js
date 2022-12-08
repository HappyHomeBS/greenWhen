import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import NoteList from './components/NoteList';
import './App.css'

function App() {
    return(
        <Container className="p-3">
            <NoteList></NoteList>
        </Container>
    )
}
export default App;