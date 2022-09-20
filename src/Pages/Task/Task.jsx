import React,{useEffect,useState} from 'react';
import { Card, Col, Row, Avatar, Button, Modal, Form, Input, Select, DatePicker, Upload, Radio,Checkbox } from 'antd';
import { UserOutlined, PlusOutlined, DeleteOutlined, EllipsisOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { taskViewThunk, updateTaskThunk } from '../../Redux/User/Action/Thunk/TaskThunk';
import { getUserList, addUserToTask, removeUserFromTaskThunk } from '../../Redux/User/Action/Thunk/UserThunk';
import Download from '../../Components/Common/File/Download';
import { url } from '../../Api/config';
import { useForm } from 'antd/es/form/Form';
import { getCategoryList } from '../../Redux/User/Action/Thunk/CategoryThunk';
import { getWorkListByCategory } from '../../Redux/User/Action/Thunk/WorkThunk';
import { fileRemoveRequest } from '../../Api/FileRequest';
import { useRef } from 'react';
import { commonAlert, prompAlert } from '../../Lib/Alert';


function Task() { 
    
   const params = useParams();
   const dispatch =  useDispatch();
   const [form] = useForm();
   const [taskForm] = useForm();
   
   const options = [];
   useEffect(() => {  
     dispatch(getUserList());
     dispatch(taskViewThunk(params.id));
     dispatch(getCategoryList());
   },[params.id]);

   


   const [isModalVisible,setModelVisible] = useState(false);
   const [isTaskModalVisible,setTaskModelVisible] = useState(false);
   const [formDisabled,setFormDisabled] = useState(false);
   const {categoryList} = useSelector(state => state.category);
   const [category,setCategory] = useState();
   const handleOk = () => {
       setModelVisible(false);
       setTaskModelVisible(false);
   }


   categoryList.map((category) => {
        options.push({
            label: category.title,
            value: category.id,
        })
    });

   const handleCancel = () => {
       setModelVisible(false);
       setTaskModelVisible(false);
   
    }

   const deleteUserFromTask = (user) => {
       prompAlert('Вы хотите удалить задачу для пользователя',
        'Удалить',
        'Отмена',
        () => {
            dispatch(removeUserFromTaskThunk(user));
            dispatch(taskViewThunk(params.id));
        },
        () => {
            
        }   
       );
        
       // commonAlert();

   }

    const onFinish = (values) => {
    values.task_id = params.id;
    if(values.deadline){
        values.deadline = values.deadline.unix();
    }
    
    dispatch(addUserToTask(values));
    dispatch(taskViewThunk(params.id));
    form.resetFields();
    setModelVisible(false);

   }

   useEffect(() => {
    dispatch(getWorkListByCategory(category));
   },[category])

   const {taskView} = useSelector(state => state.task);
   const {userList} = useSelector(state => state.user);
   const {workList} = useSelector(state => state.work);
   const {user} = useSelector(state => state);

   console.log(taskView);

   taskForm.setFieldsValue({
    title:taskView.title,
    description:taskView.description,
    category:taskView.category,
    files:taskView.files,
 });

 useEffect(() => {
    dispatch(getWorkListByCategory(category));
   },[category])


   const uploadOptions = {
    action:url.file.upload,
    showUploadList:formDisabled,
    headers: {
        'Authorization' : 'Bearer ' + user.profile._token
    },
    onChange({ file, fileList,event }) {
     /*
      if(file.status !== 'uploading' && file.status !== 'removed'){

        setNewTask ({
               ...newTask,
               files: [...newTask.files,file]
           })
       
      }
      */
    },
    onRemove:(file) => {
    //    setNewTask({...newTask,files:newTask.files.filter(f => f.uid != file.uid)});
        if(file.status !== 'uploading' ) {
            fileRemoveRequest(file, (response) => {
            
            },() => {})

        }
    
    },
    maxCount:5,
    multiple:true,
  

};


const onChangeForm = (values) => {
    values.task_id = params.id;
    dispatch(updateTaskThunk(values)); 
    dispatch(taskViewThunk(params.id));
    setFormDisabled(false);
}

const fileRef = useRef();

return (
        <>
            <Row gutter = {8}>
                <Col span = {12}>
                    <Card
                    >
                         <Checkbox checked={formDisabled} onChange={e => setFormDisabled(e.target.checked)}>
                            Изменить форму
                        </Checkbox>
                        <Form 
                            form={taskForm}
                            disabled={!formDisabled}
                            onFinish={onChangeForm}
                        >
                            <Form.Item >
                                <Button style={{float:"right"}} type = "primary" htmlType ="submit">
                                    Сохранять
                                </Button>
                            </Form.Item>    
                            <Form.Item name="title">
                                <Input />
                            </Form.Item>
                            <Form.Item name="description">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item name = "files">
                                <Upload {...uploadOptions} ref={fileRef}>
                                    <Button type="danger" shape="round" size="large" icon={<UploadOutlined />}>Загрузить файл</Button>
                                </Upload>
                            </Form.Item> 

                        </Form>
                        <div className="post_unit">
                            <p>
                                {
                                   (taskView.files) ? 
                                        taskView.files.map((file) => {
                                            return (
                                                <Row>
                                                    <Col span = {22}>
                                                         <Download title = {file.title} link = {url.download.simple+'/'+file.link} />
                                                    </Col>
                                                    <Col span = {2}>
                                                        <DeleteOutlined onClick = {
                                                            () => {
                                                                let d = {
                                                                    response:{
                                                                        id:file.id,
                                                                        document_id:params.id,
                                                                        type:'task',
                                                                    }
                                                                };
                                                                fileRemoveRequest(d, (response) => {
                                                                    dispatch(taskViewThunk(params.id)); 
                                                                },() => {})
                                                            }
                                                           }
                                                        />
                                                    </Col>
                                                </Row>
                                            )   
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
                                                <Row>
                                                    <Button type = 'primary' onClick={()=>deleteUserFromTask(user)}>Delete</Button>
                                                    
                                                </Row>
                                                <Row>
                                                    <Avatar style = {{ backgroundColor: '#87d068',marginRight:'10px' }} icon={<UserOutlined />} />
                                                    <span>{user.recipient.profile.full_name}</span>
                                                    <p>
                                                        {user.description}
                                                    </p>
                                                </Row>
                                               
                                            </Card>
                                        )
                                })
                            :null
                        }
                        <Button type='primary' onClick={() => setModelVisible(true)}><PlusOutlined /></Button>            
                </Col>
                
            </Row>
            <Modal  visible = {isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                   <Card>
                        <Form
                            onFinish={onFinish}
                            form = {form}
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
                            <Form.Item name = "description"
                                rules = {[
                                    {
                                    required: true,
                                    message: 'Missing first name',
                                    },
                                ]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item name = "deadline"
                                rules = {[
                                    {
                                    required: true,
                                    message: 'Missing first name',
                                    },
                                ]}
                            >
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


