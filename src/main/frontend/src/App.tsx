import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/authContext';
import AdminPage from './pages/AdminPage'
import CalendarPage from './pages/CalendarPage';


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
      </Routes>
    </Layout>
  );
}

export default App;