import React,{useEffect,useState} from 'react';
import { Card, Col, Row, Avatar, Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { UserOutlined,PlusOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { taskViewThunk } from '../../Redux/User/Action/Thunk/TaskThunk';
import { getUserList, addUserToTask } from '../../Redux/User/Action/Thunk/UserThunk';
import Download from '../../Components/Common/File/Download';
import { url } from '../../Api/config';

function Task() { 
    
   const params = useParams();
   const dispatch =  useDispatch();
   useEffect(() => {  
     dispatch(getUserList());
     dispatch(taskViewThunk(params.id));
   },[params.id]);


   const [isModalVisible,setModelVisible] = useState(false);
   const handleOk = () => {
       setModelVisible(false);
   }

   const handleCancel = () => {
       setModelVisible(false);
   }
   

   const onFinish = (values) => {
    values.task_id = params.id;
    if(values.deadline){
        values.deadline = values.deadline.unix();
    }
    dispatch(addUserToTask(values));
    // dispatch(taskViewThunk(params.id));
    // setModelVisible(false);

   }

   const {taskView} = useSelector(state => state.task);
   const {userList} = useSelector(state => state.user);


   return (
        <>
            <Row gutter = {8}>
                <Col span = {12}>
                    <Card
                    actions={[
                        <EditOutlined key="edit" />,
                      ]}
                    >
                        {taskView.title}
                        {taskView.description}
                        <div className="post_unit">
                            <p>
                                {
                                   (taskView.files) ? 
                                        taskView.files.map((file) => {
                                            return <Download title = {file.title} link = {url.download.simple+'/'+file.link} />
                                        })
                                    : ""
                                }
                            </p>  
                        </div>
                    </Card>
                </Col>
                <Col span = {12}>
                        {
                                (
                                    taskView.user
                                ) ? 
                                taskView.user.map((user) => {
                                    return (
                                            <Card style = {{marginBottom:'10px'}}> 
                                                <Avatar style = {{ backgroundColor: '#87d068',marginRight:'10px' }} icon={<UserOutlined />} />
                                                <span>{user.recipient.profile.full_name}</span>
                                                <p>
                                                    {user.description}
                                                </p>
                                            </Card>
                                        )
                                })
                            :null
                        }
                        <Button type='primary' onClick={() => setModelVisible(true)}><PlusOutlined /></Button>            
                </Col>
                
            </Row>
            <Modal  visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                   <Card>
                        <Form
                            onFinish={onFinish}
                        >
                        <Form.Item    
                                name = "user"
                                rules = {[
                                    {
                                    required: true,
                                    message: 'Missing first name',
                                    },
                                ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder = "Select a person"
                                        optionFilterProp = "children"
                                        onChange = {() => {}}
                                        onSearch = {() => {}}
                                        filterOption = {(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                    >
                                        {
                                            userList.map((user) => {
                                                return  <Select.Option onChange={()=>{}} key={user.id} value={user.id}>{user.profile.full_name}</Select.Option>
                                            })
                                            
                                        }
                                    </Select>
                                </Form.Item>
                            <Form.Item name = "description">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item name = "deadline">
                                <DatePicker />
                            </Form.Item>
                           
                            <Form.Item>
                                 <Button type = "primary" htmlType="submit">
                                     Сохранить
                                </Button>
                            </Form.Item>
                        </Form>
                   </Card>
                   
            </Modal>
        </>
    )

}

export default Task