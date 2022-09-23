import { Card, Button, Modal, Form, Input, DatePicker, Select, Upload, Typography, Space, List } from 'antd';
import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleWorkThunk, updateWorkThunk } from '../../Redux/User/Action/Thunk/WorkThunk';
import { url } from '../../Api/config';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getCategoryList } from '../../Redux/User/Action/Thunk/CategoryThunk';
import { useForm } from 'antd/es/form/Form';
import { fileRemoveRequest } from '../../Api/FileRequest';

function Single(){

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {singleWork} = useSelector(state => state.work);
    const {categoryList} = useSelector(state => state.category);
    const {user} = useSelector(state => state); 
    const [jobForm] = useForm();
    const [visibleModal,setVisibleModal] = useState(false);

    useEffect(() => {
        dispatch(getSingleWorkThunk(params.id));
        dispatch(getCategoryList());
        jobForm.setFieldsValue({
            id:singleWork.id,
            title:singleWork.title,
            description:singleWork.description,
            term:moment.unix(singleWork.term),
            category:singleWork.category_id,
        })
    },[params.id]);
    
    console.log(singleWork,1221);
    console.log(categoryList);
    
    const term  = moment.unix(singleWork.term);

    const submitForm = (values) => {
        if(values.term){
            values.term = values.term.unix();
        }
        dispatch(updateWorkThunk(values));
        setVisibleModal(false);
    }

    const cancelModal = () => {
        setVisibleModal(false);
    }

    const removeFile = (file) => {
        fileRemoveRequest(file, 
            (response) => {
                  console.log(response);  
            },
            (error) => {

            }
        )
    }

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
            <Card>
                <Button type = 'primary'>Завершить</Button>
                <Button type = 'dashed' onClick={()=>setVisibleModal(true)}>Изменить</Button>
                <p>{singleWork.title}</p>
                <p>{singleWork.description}</p>
                <p>{singleWork.status}</p>
                <p>
                    {
                      (singleWork.files) ? singleWork.files.map((file) => {
                            return (
                                <List>
                                    <List.Item>
                                        <Typography.Text type="warning">{file.title}</Typography.Text>
                                        <DeleteOutlined onClick={()=>removeFile(file)}/>
                                    </List.Item>
                                </List>
                            )
                        })
                        :""
                    }
                </p>
            </Card>
            <Modal visible = {visibleModal} onCancel={cancelModal}  footer = {null}>
                    <Form form = {jobForm} onFinish = {submitForm}>
                        <Form.Item name = "id" hidden = {true}> 
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name = "title"
                            rules = {[
                                {
                                    required: true,
                                    message: 'Required field!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item 
                            name="description"
                            rules = {[
                                {
                                    required: true,
                                    message: 'Required field!',
                                },
                            ]}
                        >
                            <Input.TextArea  />
                        </Form.Item>
                        <Form.Item 
                            name = "term"
                            //initialValue={singleWork.term}
                            rules = {[
                                {
                                    required: true,
                                    message: 'Required field!',
                                },
                            ]}
                        >
                            <DatePicker  />
                        </Form.Item>

                        <Form.Item 
                            name="category"
                            rules = {[
                                {
                                    required: true,
                                    message: 'Required field!',
                                },
                            ]}
                        >
                             <Select
                                    value={singleWork.category_id}
                                    onChange={()=>{}}
                                    >
                                        {
                                            categoryList.map((c)=>{
                                             
                                                return <Select.Option value={c.id}>{c.title}</Select.Option>
                                             
                                            })
                                        }
                                  
                                    </Select>
                            

                        </Form.Item>
                        
                       
                        <Form.Item name = "files">
                            <Upload {...uploadOptions} >
                                <Button type="danger" shape="round" size="large" icon={<UploadOutlined />}>Загрузить файл</Button>
                            </Upload>
                        </Form.Item>
                        
                        <Form.Item>
                            <Button type ="primary" htmlType ="submit">
                            Сохранять
                            </Button>
                        </Form.Item>
                    </Form>
            </Modal>
        </>
    )

}

export default Single