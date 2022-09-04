import React from 'react';
import { Card } from 'antd';
import { SettingOutlined,EditOutlined,EllipsisOutlined  } from '@ant-design/icons';
function TaskCard({data}) {
  return (
    <>
        <Card
            actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
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
        </Card>
    </>
  )
}

export default TaskCard