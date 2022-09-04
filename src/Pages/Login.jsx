import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Button, Checkbox, Form, Input,Row,Col  } from 'antd';
import './Login.css';
import { authUser } from '../Redux/User/Action/Thunk/UserThunk';


function Login() {
    const { Header, Footer, Content } = Layout;
 
    const dispatch = useDispatch();
    const [auth,setAuth] = useState({
        email:null,
        password:null,
    });

    const Login = (e) => {
        e.preventDefault();
        dispatch(authUser(auth));
    }


    return (
        <>
            <Layout>
                <Content>
                    <Row justify="center">
                        <Col  span={12}>
                            <Form
                                className="login_form"
                                name="basic"
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 18,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                              
                                autoComplete="off"
                               
                                >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                    ]}
                                >
                                    <Input onChange={(e)=>setAuth({...auth,email:e.target.value})} />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    ]}
                                >
                                    <Input.Password onChange={(e)=>setAuth({...auth,password:e.target.value})} />
                                </Form.Item>

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                    offset: 6,
                                    span: 18,
                                    }}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                    offset: 6,
                                    span: 18,
                                    }}
                                >
                                    <Button type="primary" onClick={Login} htmlType="submit">
                                    Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    
                </Content>
            </Layout>
        </>
    )
}

export default Login