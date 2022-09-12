import React,{useEffect, useState} from 'react'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Card, Row, Col ,Upload, Radio, Select,DatePicker } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../Api/config';
import { getCategoryList } from '../../Redux/User/Action/Thunk/CategoryThunk';
import { getUserList } from '../../Redux/User/Action/Thunk/UserThunk';
import { getWorkListByCategory } from '../../Redux/User/Action/Thunk/WorkThunk';
import { createNewTask } from '../../Redux/User/Action/Thunk/TaskThunk';


function Create() {
    const onFinish = (values) => {
        if(values.users){
            values.users.map((user) => {
                user.deadline = user.deadline.unix();
            });
        }
        dispatch(createNewTask(values));
        form.resetFields();
        
    };
    const dispatch = useDispatch();
    const {user} = useSelector(state => state);
    const {categoryList} = useSelector(state => state.category);
    const {workList} = useSelector(state => state.work);
    const {userList} = useSelector(state => state.user);
    const [category,setCategory] = useState();
    const [form] = useForm();
    const options = [];

    useEffect(() => {
        dispatch(getUserList());
        dispatch(getCategoryList());
   },[]);

   useEffect(() => {
    dispatch(getWorkListByCategory(category));
   },[category])

    categoryList.map((category)=>{
        options.push({
            label: category.title,
            value: category.id,
        })
    });

    const uploadOptions = {
        action:url.file.upload,
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
            /*
            setNewTask({...newTask,files:newTask.files.filter(f => f.uid != file.uid)});
            if(file.status !== 'uploading' ) {
                fileRemoveRequest(file, (response) => {
                
                },() => {})
    
            }
            */
        
        },
        maxCount:5,
        multiple:true,
      
    
    };
  return (
    <>
        <Form form = {form}  name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
           <Row gutter={8}>
            <Col span={24}>
                <Form.Item>
                    <Button type ="primary" htmlType ="submit">
                    Сохранять
                    </Button>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Card>
                    <Form.Item
                        name = "title"
                        rules = {[
                                    {
                                        required: true,
                                        message: 'Please input task title!',
                                    },
                                    {
                                        min:3,
                                    },
                                ]}
                        >
                            <Input  />
                    </Form.Item>
                    <Form.Item
                        name = "description"
                        rules = {[
                            {
                                required: true,
                                message: 'Please input task description!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name = "files">
                            <Upload {...uploadOptions} >
                                <Button type="danger" shape="round" size="large" icon={<UploadOutlined />}>Загрузить файл</Button>
                            </Upload>
                    </Form.Item> 
                    <Form.Item 
                        name = "category"
                        label = "Выберите категорию"
        
                        rules = {[
                            {
                                required: true,
                                message: 'Please select category!',
                            },
                        ]}
                    >
                        <Radio.Group options={options}  onChange ={(e) =>{setCategory(e.target.value)}} />                 
                    </Form.Item>  
                    <Form.Item
                            name = "job"
                            rules = {[
                            {
                                required: true,
                                message: 'Please select job!',
                            },
                            ]}
                        >
                        <Select>
                            {
                                workList.map((work) => {
                                    return (
                                        <Select.Option key = {work.id} value={work.id}>{work.title}</Select.Option>
                                    ) 
                                })
                            }
                        </Select>
                    </Form.Item>    
                </Card>
            </Col>
            <Col span={12}>
                    <Form.List name="users">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                            <Card style = {{marginBottom:'10px'}}>
                                <MinusCircleOutlined  onClick={() => remove(name)} />
                                <Form.Item
                                {...restField}
                                name = {[name, 'id']}
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
                                <Form.Item
                                    {...restField}
                                    name={[name, 'comment']}
                                    rules={[
                                        {
                                        required: true,
                                        message: '',
                                        },
                                    ]}
                                >
                                    <Input.TextArea  rows = {4} />
                                </Form.Item>
                                <Form.Item
                                    name={[name, 'deadline']}
                                    rules={[
                                        {
                                        required: true,
                                        message: '',
                                        },
                                    ]}
                                    
                                >
                                    <DatePicker />
                                </Form.Item>
                            </Card>
                            ))}
                            <Form.Item>
                            <Button type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
                                Добавить исполнителя
                            </Button>
                            </Form.Item>
                        </>
                        )}
                    </Form.List>   
                
            </Col>
           </Row>
        </Form>
    </>
  )
}

export default Create