import './Main.css';
import {Routes,Route} from 'react-router-dom';
import { Layout } from 'antd';
import PageHeader from '../Components/Header/Header';
import PageSidebar from '../Components/Sidebar/PageSidebar';
import TaskList from './Task/TaskList';
import TaskSingle from './Task/TaskSingle';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/User/Action/Simple/UserAction';
import Result from './Search/Result';
import Report from './Report/Report';
import Self from './Report/Self';
import Create from './Task/Create';


function Main() {
  const { Header, Footer, Sider, Content } = Layout;

  const dispatch=useDispatch();
  const signOut = () => {
    localStorage.removeItem('user');
    dispatch(logout());
  }

  return (
    <Layout className='App'>
      <Sider width={300}  className='layout_sidebar'>
        <button onClick = {signOut} >Log out</button>
        <PageSidebar />
      </Sider>
      <Layout>
        <Header className='layout_header'>
          <PageHeader />
        </Header>
        <Content className='layout_content'>
           <Routes>
              <Route path = "/task/:category/:box/:page" element = {<TaskList />} /> 
              <Route path = "/task/single/:id" element = {<TaskSingle />} /> 
              <Route path = "/task/create" element = {<Create />} /> 
              <Route path = "/search/:query/:page" element = {<Result />} /> 
              <Route path="/report">
                  <Route path = "job" element = {<Report />} /> 
                  <Route path = "self" element = {<Self />} /> 
              </Route>
            </Routes>
        </Content>
        <Footer className='layout_footer'>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default Main;
