import React from 'react';
import { Table,Spin } from 'antd';
function List({
            loading,
            data,
            pagination
        }) 
        {
            return (
            <>
                <Spin spinning={loading}>
                    <Table 
                        columns={data.columns} 
                        dataSource={data.source} 
                        pagination={pagination}
                    />
                </Spin>
            </>
            )
        }

export default List;