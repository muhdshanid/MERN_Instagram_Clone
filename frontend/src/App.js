import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SavedPosts from './pages/SavedPosts';
import EditProfile from './pages/EditProfile';
import Suggested from './pages/Suggested';
import OtherUserProfile from './pages/OtherUserProfile';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import Explore from './pages/Explore';
import Messages from './pages/Messages';
function App() {
  const {user,token} = useSelector(state => state.authReducer)
  return (
    <div className="">
    <BrowserRouter>
    <Routes>
      {
        user !== null && token !== null ? 
        <Route path='/' element={<MainLayout/>}>
        <Route index  element={<Home/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='explore' element={<Explore/>}/>
        <Route path='messages' element={<Messages/>}/>
        <Route path='other-profile/:id' element={<OtherUserProfile/>}/>
        <Route path='saved-posts' element={<SavedPosts/>}/>
        <Route path='edit-profile' element={<EditProfile/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='suggested-users' element={<Suggested/>}/>
      </Route> : ""
      }
      <Route path='/login' element={user === null ? <Login/> : ""}/>
      <Route path='/signup' element={user === null ? <Signup/> : ""}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
