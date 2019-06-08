import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

import "../styles/sign-up.css";
import { signUpUser } from "../services/api";

class signUpForm extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (localStorage.getItem("chat_app_user_token")) this.props.history.push("/chat");
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let res = await signUpUser(values, this.props.history);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="screen-center full-screen-size">
                <div className="card">
                    <h3>Sign Up</h3>
                    <Form onSubmit={(e) => this.onFormSubmit(e)} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please pick a user name' }],
                            })(
                                <Input
                                    prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('email_id', {
                                rules: [{ type: 'email', required: true, message: 'Please input your Email ID!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email Id"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <div style={{ textAlign: "center", marginBottom: 20 }}><a onClick={() => {
                            this.props.history.push("/login");
                        }}>Existing User? Login</a></div>
                        <Button style={{ width: 320 }} type="primary" htmlType="submit" className="login-form-button">
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
const signUp = Form.create({ name: 'normal_login' })(signUpForm);
export default signUp;