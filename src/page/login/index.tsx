import React, { useState } from 'react';
import { Card, Form, Input, Button, Alert, } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, selectAuthentication } from '../../slice/token';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import "./login.less"

import * as yup from 'yup';
import { AppDispatch } from '../../store';

let schema = yup.object().shape({
    username: yup.string().required("This field is required!"),
    password: yup.string().required("This field is required!"),
});

const yupSync = {
    async validator({ field }: any, value: any) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};

export function LoginPage() {
    const [loading, setLoading] = useState<boolean>()
    const auth = useSelector(selectAuthentication);
    const dispatch: AppDispatch = useDispatch();
    let navigate = useNavigate();


    const onFinish = (values: { username: string, password: string }) => {
        setLoading(true)
        dispatch(authenticateUser(values)).unwrap()
            .then(() => {
                setLoading(false)
                window.location.reload();
                navigate("/home");
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (auth.isLoggedIn) {
        return <Navigate to="/home" />;
    }
    else
        return (
            <div className='main'>
                <Card className="login-form" hoverable={true} title="Authentication" >
                    <Form
                        name="normal_login"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[yupSync]}
                        >
                            <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[yupSync]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                size='large'
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} block shape='round' type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                        <Form.Item>
                            <Alert message={`Username:"eve.holt@reqres.in"/    Password:"cityslicka"`} type="info" />
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        )
}
