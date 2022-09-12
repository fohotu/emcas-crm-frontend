import './App.css';
import Main from './Pages/Main';
import Login from './Pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuthData } from './Redux/User/Action/Simple/UserAction';
import { useMemo } from 'react';


function App() {
  

  const dispatch = useDispatch();
  useMemo(() => {
    if(localStorage.getItem('user')){
      const user = localStorage.getItem('user');
     //alert(user); 
      let js = JSON.parse(user);
      axios.defaults.headers.common['Authorization'] = 'Bearer '+js._token;
      dispatch(setAuthData(js));
    
    }

  },[]);

  const { user }= useSelector(state => state)
  
  return (
    <>  
     { (user.isAuth) ? <Main /> : <Login /> }
    </>
  );
}


export default App;
