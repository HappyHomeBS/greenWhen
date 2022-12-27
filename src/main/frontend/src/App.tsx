import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreateAccountPage from './pages/CreateAccountPage';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/authContext';
// import NoteListComponent from './components/Note/NoteListComponent';
// import NoteReadComponent from './components/Note/NoteReadComponent';
// import NoteWriteComponent from './components/Note/NoteWriteComponent';


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccountPage />} />        
        <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />} />
        {/* 업데이트 되면서 component ={} -> element{<>/}로 사용*/}
        {/* <Route path="/note/:userId" element = {<NoteListComponent/>}></Route>
        <Route path="/noteWrite" element = {<NoteWriteComponent/>}></Route>
        <Route path="/noteRead/:no" element = {<NoteReadComponent/>}> </Route> */}
      </Routes>
    </Layout>
  );
}

export default App;