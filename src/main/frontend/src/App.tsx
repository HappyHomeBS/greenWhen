import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/authContext';
import AdminPage from './pages/AdminPage'
import CalendarPage from './pages/CalendarPage';
import Main from './pages/Main';
import Page from './pages/Page';
import CreateBoard from './pages/CreateBoard';
import UpdateBoard from './pages/UpdateBoard';
import Bulletin from './pages/Bulletin';
import NoteListComponent from './components/Note/NoteListComponent';
import NoteReadComponent from './components/Note/NoteReadComponent';
import NoteWriteComponent from './components/Note/NoteWriteComponent';
import NoteSentListComponent from './components/Note/NoteSentListComponent';


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {/*로그인 여부, 유저권한에 따라서 조건에 부합하지 않을경우 홈으로 이동 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />} />
        <Route path="/admin/" element={!authCtx.isLoggedIn || authCtx.userObj.role !== 'ROLE_ADMIN' ? <Navigate to='/' /> : <AdminPage />} />
        <Route path="/calendar/" element= {<CalendarPage />}/>
        <Route path="/main" element={<Main />} />
        <Route path="/page" element={<Page />} />
        <Route path="/create-board" element={<CreateBoard />} />
        <Route path="/update-board" element={<UpdateBoard />} />
        <Route path="/bulletin" element={<Bulletin />} />
         {/* 업데이트 되면서 component ={} -> element{<>/}로 사용*/}
        <Route path="/note" element = {<NoteListComponent/>}></Route>
        <Route path="/noteWrite" element = {<NoteWriteComponent/>}></Route>
        <Route path="/noteRead/:no" element = {<NoteReadComponent/>}> </Route>
        <Route path="/noteSentList" element = {<NoteSentListComponent/>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;