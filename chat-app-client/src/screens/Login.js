import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import "../styles/login.css";
import { loginUser } from "../services/api";

class LoginForm extends Component {
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
        let res = await loginUser(values, this.props.history);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="screen-center full-screen-size">
        <div className="card">
          <h3>Login</h3>
          <Form onSubmit={(e) => this.onFormSubmit(e)} className="login-form">
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
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <a onClick={() => this.props.history.push("/signup")}>first time? Register Now</a>
            </div>
            <Button style={{ width: 320 }} type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
          </Form>
        </div>
      </div>
    );
  }
}
const Login = Form.create({ name: 'normal_login' })(LoginForm);
export default Login;