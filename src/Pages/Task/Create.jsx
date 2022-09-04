import React,{useState, useEffect, useRef} from 'react'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, Select, Card, Row, Col, Radio } from 'antd';
import { useDispatch } from 'react-redux';
import { createNewTask } from '../../Redux/User/Action/Thunk/TaskThunk';
import { url } from '../../Api/config';
import { useSelector } from 'react-redux';
import { fileRemoveRequest } from '../../Api/FileRequest';
import { getCategoryList } from '../../Redux/User/Action/Thunk/CategoryThunk';
import { getUserList } from '../../Redux/User/Action/Thunk/UserThunk';
import { getWorkListByCategory } from '../../Redux/User/Action/Thunk/WorkThunk';


function Create() {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state);
    const options = [];
    const usersRef = useRef(null);

   const [newTask,setNewTask] = useState({
    title:null,
    description:null,
    category:null,
    files:[],
    users:null,
   });

   const [categoryValue, setCategoryValue] = useState();
   const onChangeCategory = ({ target: { value } }) => {
        setCategoryValue(value);
        
    };
   useEffect(()=>{
        dispatch(getUserList());
        dispatch(getCategoryList());
        
   },[]);

   useEffect(()=>{
       
    dispatch(getWorkListByCategory(categoryValue));
    //dispatch(setNewTask({...newTask,selectedJobId:0}));

},[categoryValue])

   const {categoryList} = useSelector(state => state.category);
   const {workList} = useSelector(state => state.work);
   const {userList} = useSelector(state => state.user);

  

   categoryList.map((category)=>{
        options.push({
            label: category.title,
            value: category.id,
        })
    });


   const addUser = (values) => {
        console.log(values);
        setNewTask({...newTask,users:values});
        console.log(newTask);
   } 

   const setUsers = (values) => {
        if(values.users){
            setNewTask({...newTask,users:values.users});
        }
   }

   const onFinish = (values) => {
        if(values.users){
            setNewTask({...newTask,users:values.users});
        }
    
        console.log(newTask);

        //dispatch(createNewTask(newTask));
    };

  const uploadOptions = {
    action:url.file.upload,
    headers: {
        'Authorization' : 'Bearer ' + user.profile._token
    },
    onChange({ file, fileList }) {
      if(file.status !== 'uploading' ){

        setNewTask ({
               ...newTask,
               files: [...newTask.files,file]
           })
       
      }
    },
    onRemove:(file) => {
        if(file.status !== 'uploading' ) {
            fileRemoveRequest(file,(response) => {
                
            },() => {})
        }
    },
    maxCount:5,
    multiple:true,
  
};

  return (
    <>
        <Form 
            onValuesChange={(changedValue,allValue)=>setUsers(allValue)}
            name="dynamic_form_nest_item" 
            layout="horizontal" 
            onFinish={onFinish} 
            autoComplete="off">
            <Row gutter={8}>
                <Col span={12}>
                    <Card >
                        
                                <Form.Item>
                                            <Input onChange={(e)=>setNewTask({...newTask,title:e.target.value})} />
                                </Form.Item>
                                <Form.Item>
                                            <Input.TextArea onChange={(e)=>setNewTask({...newTask,description:e.target.value})} rows = {4} />
                                </Form.Item>
                                <Form.Item>
                                            <Upload {...uploadOptions} >
                                                <Button type="danger" shape="round" size="large" icon={<UploadOutlined />}>Загрузить файл</Button>
                                            </Upload>
                                </Form.Item>  
                                <Form.Item label="Выберите категорию">

                                    <Radio.Group options={options} onChange={onChangeCategory} value={categoryValue} />
                                                    
                                </Form.Item>  
                                <Form.Item>
                                    <Select>
                                        {
                                            workList.map((work) => {
                                                return (
                                                    <Select.Option value={work.id}>{work.title}</Select.Option>
                                                ) 
                                            })
                                        }
                                    </Select>
                                   
                                </Form.Item>        
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                    Submit
                                    </Button>
                                </Form.Item>
                        
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        
                                <Form.List ref={usersRef}  name="users" >
                                    {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                        <> 
                                            <Form.Item
                                            {...restField}
                                            name = {[name, 'user']}
                                            rules = {[
                                                {
                                                required: true,
                                                message: 'Missing first name',
                                                },
                                            ]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={() => {}}
                                                    onSearch={() => {}}
                                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                                >
                                                    {
                                                        userList.map((user) => {
                                                            return  <Select.Option onChange={()=>addUser(user)} key={user.id} value={user.id}>{user.profile.full_name}</Select.Option>
                                                        })
                                                        
                                                    }
                          
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                            {...restField}
                                            name={[name, 'comment']}
                                            rules={[
                                                {
                                                required: true,
                                                message: 'Missing last name',
                                                },
                                            ]}
                                            >
                                            <Input.TextArea  rows = {4} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </> 
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add field
                                            </Button>
                                        </Form.Item>
                                    </>
                                    )}
                                </Form.List>
        
                    
                    </Card>  
                </Col>
            </Row>
        </Form>
        
    </>
  )
}

export default Create