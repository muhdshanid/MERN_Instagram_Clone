import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SavedPosts from './pages/SavedPosts';
import EditProfile from './pages/EditProfile';
import Suggested from './pages/Suggested';
import OtherUserProfile from './pages/OtherUserProfile';
function App() {
  return (
    <div className="">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index  element={<Home/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='other-profile' element={<OtherUserProfile/>}/>
        <Route path='saved-posts' element={<SavedPosts/>}/>
        <Route path='edit-profile' element={<EditProfile/>}/>
        <Route path='suggested-users' element={<Suggested/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
