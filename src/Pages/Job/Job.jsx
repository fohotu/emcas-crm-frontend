import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { workPaginatedListThunk, createNewJobThunk } from '../../Redux/User/Action/Thunk/WorkThunk';
import { setCurrentPage } from '../../Redux/User/Action/Simple/PaginationAction';
import List from '../Task/List';
import { Button, Form, Input, Modal, Upload,DatePicker } from 'antd';
import { url } from '../../Api/config';
import { UploadOutlined } from '@ant-design/icons';


function Job(){

    const params = useParams();
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const {workList} = useSelector(state => state.work);
    const {user} = useSelector(state => state); 

    useEffect(() => {
        dispatch(setCurrentPage(params.page));
        dispatch(workPaginatedListThunk(params));
    },[params.category,params.page]);

    const [visibleModal,setVisibleModal] = useState(false);




  const {loading} = useSelector( state => state.task );
  const pagination = useSelector( state => state.pagination );

  const handleCancel = () => {
    setVisibleModal(false)
  }

  const sendForm = (values) => {
        values.deadline = values.deadline.unix();
        dispatch(createNewJobThunk(values))
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



  const data = {
    columns : [
        {
          title: '#',
          dataIndex: 'user',
          key: 'user',
        },
        {
          title: 'Название',
          dataIndex: 'title',
          key: 'title',
          render: (text,record,index) => { return ((record) ? <Link  className="single_link" to={`/task/single/${record.key}`} >{text}</Link> : "")},
        },
        {
          title: 'Описание',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Статус',
          dataIndex: 'status',
          key: 'status',
        }
    ],
    source:workList,
  };

  const paginate = {
    ...pagination,
    onChange: (pageNumber) => {
      navigate(`/job/${params.category}/${pageNumber}`); 
    }
  };


  return (
    <div>
        <Button type="primary" onClick={()=>setVisibleModal(true)}>Add</Button>
        <List  data={data} pagination={paginate} loading={loading} />

        <Modal visible = {visibleModal} footer={null}  onCancel={handleCancel}>
            <Form onFinish={sendForm}>
            <Form.Item 
                    hidden={true}
                    name="category"
                    initialValue={params.category}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="title"
                    rules = {[
                        {
                            required: true,
                            message: 'Please input task title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
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
                    name="deadline"
                    rules = {[
                        {
                            required: true,
                            message: 'Please input task description!',
                        },
                    ]} 
                >
                    <DatePicker onChange={()=>{}} />
                </Form.Item>
                <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Сохранить
                        </Button>
                </Form.Item>
            </Form>
        </Modal>
    
    </div>
  );


}

export default Job