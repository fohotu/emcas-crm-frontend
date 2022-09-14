import React,{useState} from 'react';
import { Card , Modal} from 'antd';
import Download from '../../Components/Common/File/Download';
import { SettingOutlined,EditOutlined,EllipsisOutlined  } from '@ant-design/icons';
import { url } from '../../Api/config';
import Edit from './Edit';

function TaskCard({data}) {

    const [isModalVisible,setModelVisible] = useState(false);
    const handleOk = () =>{
        setModelVisible(false);
    }

    const handleCancel = () => {
        setModelVisible(false);
    }

  return (
    <>
        <Card
            actions = {[
                        <SettingOutlined key = "setting" onClick={()=>setModelVisible(true)}/>,
                        <EditOutlined key = "edit" />,
                        <EllipsisOutlined key = "ellipsis" />,
                    ]}
            className="task_card"
        >
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