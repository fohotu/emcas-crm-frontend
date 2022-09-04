import React,{useState} from 'react'
import { BellOutlined,UserOutlined} from '@ant-design/icons';
import { Dropdown,Menu,Badge,Input,AutoComplete, Result } from 'antd';
import './HeaderMenu.css';

import { useSelector, useDispatch } from 'react-redux';
import { liveSearchThunk } from '../../Redux/User/Action/Thunk/SearchThunk';
import { useNavigate, useParams } from 'react-router-dom';

function HeaderMenu() {
    const {live} = useSelector(state => state.search);

    const [searchWidth,setSearchWidth]=useState(370);
    const [options, setOptions] = useState(live.items);
    const [selectedValue,setSelectedValue]=useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params=useParams();

    const handleSearch = (value) => {
      if(value.length > 2) {
        dispatch(liveSearchThunk(value));
        setOptions(live.items);
      }
    };

    const onSelect = (value,option) => {
      
      params.id = option.userTaskId;
      setSelectedValue('');
      setOptions([]);
      navigate('/task/single/' + option.userTaskId);

    };

    const searchClickHandler = () => {
      setSelectedValue('');
      setOptions([]);
      navigate('/search/' + selectedValue+'/1');
    }


    const menu = (<Menu
    items = {[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item
          </a>
        ),
      },

    ]}

  />)


  return (
    <div>
      <ul className='menu'>
        <li>
          <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{
              width: 300,
            }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            value={selectedValue}
            onChange={(value)=>setSelectedValue(value)}
          >
            <Input.Search className="search_field" onSearch={searchClickHandler}  placeholder=""  style={{ width: searchWidth }} />
          </AutoComplete>
        </li>
        <li>
          <Dropdown placement = "bottom" arrow overlay = {menu}>
              <Badge count={2}>
                <BellOutlined rotate={32} style={{fontSize:'24px'}}/>
              </Badge>
          </Dropdown>
        </li>
        <li>
          <Dropdown placement = "bottom" arrow overlay = {menu}>
              <UserOutlined style = {{fontSize:'24px'}} />
          </Dropdown>
        </li>
      </ul>
        
       
       

  
    </div>
  )
}

export default HeaderMenu