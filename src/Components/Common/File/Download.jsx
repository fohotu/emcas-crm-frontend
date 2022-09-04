import React from 'react';
import { FileOutlined } from '@ant-design/icons';
import './Download.css';

function Download({title,link}) {
  return (
    <div>
        <FileOutlined className="file_icon"/><a className="file_link" href={link} download>{title}</a>
    </div>
  )
}

export default Download