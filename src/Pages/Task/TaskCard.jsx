import React,{useState} from 'react';
import { Button, Card , Modal} from 'antd';
import Download from '../../Components/Common/File/Download';
import { SettingOutlined,EditOutlined,EllipsisOutlined  } from '@ant-design/icons';
import { url } from '../../Api/config';
import Edit from './Edit';
import { changeTaskStatusThunk, getSingleTask } from '../../Redux/User/Action/Thunk/TaskThunk';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function TaskCard({data}) {

    const [isModalVisible,setModelVisible] = useState(false);
    const dispatch =  useDispatch(); 
    const params = useParams();
    const handleOk = () =>{
        setModelVisible(false);
    }

    const handleCancel = () => {
        setModelVisible(false);
    }

    const accept = () => {
        let task = {
          id:params.id,
          status:'finished',
        }
        dispatch(changeTaskStatusThunk(task));
        dispatch(getSingleTask(params.id));
    }

    const activet = () => {
        let task = {
            id:params.id,
            status:'active',
          }
          dispatch(changeTaskStatusThunk(task));
          dispatch(getSingleTask(params.id));
    }
   
    console.log(params);

  return (
    <>
        <Card
            actions = {[
                        /*
                        <SettingOutlined key = "setting" onClick={()=>setModelVisible(true)}/>,
                        <EditOutlined key = "edit" />,
                        <EllipsisOutlined key = "ellipsis" />,
                        */
                    ]}
            className="task_card"
        >
            {
                (params.type == 'outbox') ?
                    (data.status=='active') ?
                        <Button type="primary" onClick = {accept}>Завершить</Button>
                     :
                        <Button type="primary" danger onClick = {activet}>Активировать</Button>
                :""        

            }
             
            <div className="post_unit">
                <p>
                    { data.task.work.title }
                </p>
                <p>
                    { data.task.work.description }
                </p>
            </div>
            <div className="post_unit">
                <p>
                    {data.task.title}
                </p>
                <p>
                    {data.task.description}
                </p>
            </div>
            <div className="post_unit">
                <p>
                    {data.description}
                </p>  
            </div>
            <div className="post_unit">
                <p>
                    {
                        data.task.files.map((file) => {
                            return <Download title={file.title} link={url.download.simple+'/'+file.link} />
                        })
                    }
                </p>  
            </div>
        </Card>
        <Modal  visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                    <Edit task={data}/>
        </Modal>
    </>
  )
}

export default TaskCard