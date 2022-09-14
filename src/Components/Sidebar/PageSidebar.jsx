import React from 'react'
import Logo from '../Common/Logo/Logo'
import {Menu} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined,CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
function PageSidebar() {

  const onClick = (e) => {
    //console.log('click ', e);
  };

  const getItem=(label, key, icon, children, type) => (
      {
        key,
        icon,
        children,
        label:<Link style={{color:'#fff'}} to={key}>{label}</Link>,
        type
      }
    )
    
    
    const items = [
      getItem('Мои задачи', 'task/mine/1',<CheckCircleOutlined />),
      getItem('Входящие задачи', 'sub1', <MailOutlined />, [
        getItem('Запланированные задачи', 'task/1/inbox/1',<CheckCircleOutlined />),
        getItem('Не запланированные задачи', 'task/2/inbox/1',<CheckCircleOutlined />),
      ],'dvider'),
      getItem('Исходящие задачи', 'sub2', <AppstoreOutlined />, [
        getItem('Создать задачу', 'task/create',<CheckCircleOutlined />),
        getItem('Запланированные задачи', 'task/1/outbox/1',<CheckCircleOutlined />),
        getItem('Не запланированные задачи', 'task/2/outbox/1',<CheckCircleOutlined />),
      ]),
      getItem('Настройки', 'sub3', <SettingOutlined />, [
        getItem('Отчет', 'report',<CheckCircleOutlined />),
        getItem('Изменить профиль', 'user',<CheckCircleOutlined />),
      ]),
      getItem('Регистрация', 'sub4', <CheckCircleOutlined />, [
        getItem(' Плановой работы', 'reg/1/1',<CheckCircleOutlined />),
        getItem('Не плановой работы', 'reg/2/1',<CheckCircleOutlined />),
      ]),
      
     
    ];


  return (
    <div>
      <Logo />
      <Menu
                onClick={onClick}
                style={{
                    width: '100%',
                    height:'100%',
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1','sub2','sub3','sub4']}
                mode="inline"
                items={items}
                theme="dark"
      />
 
 
    </div>
  )
}

export default PageSidebar