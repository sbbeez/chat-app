import React, { Component } from 'react';
import { Icon, Input } from 'antd';

import { emitEvent, onMessageReceived, onUserChange, setSocket } from "../services/socket";
import { getRecentChat } from "../services/api";
import "../styles/chat.css";
import liveChat from '../assets/liveChat.png';
import { Drawer } from 'antd';


const Search = Input.Search;
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      currentUser: "",
      usersList: [],
      messageList: [],
      typedMessage: ""
    }
  }

  showDrawer = () => {
    this.setState({ visible: true });
  }

  onClose = () => {
    this.setState({ visible: false });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }


  async onUserSelected(user) {
    this.setState({ currentUser: user, messageList: [] });
    this.onClose();
    let messages = await getRecentChat(user.socketListenId, `user_${localStorage.getItem("chat_app_user_token")}`);
    messages = messages.map(m => ({
      message: m.message,
      received: m.sent_by != user.socketListenId ? true : false
    }));
    this.setState({ messageList: messages });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    if (!localStorage.getItem("chat_app_user_token")) {
      this.props.history.push("/");
    }
    else {
      this.scrollToBottom();
      setSocket();
      let value = localStorage.getItem("chat_app_user_token");
      let socketListenId = `user_${value}`;
      emitEvent("status_change", { token: value, socketListenId, type: "join" });
      onUserChange((usersList) => {
        usersList = usersList.filter(u => this.state.socketListenId != u.socketListenId);
        this.setState({ usersList });
      });
      this.setState({ socketListenId });
      onMessageReceived(socketListenId, (data) => {
        if (this.state.currentUser.socketListenId == data.senderSocketId) {
          this.onMessage({ message: data.message, received: true });
        }
      });
    }
  }

  onMessage(message) {
    let newMessageList = this.state.messageList.concat([message]);
    this.setState({ messageList: newMessageList });

  }

  logoutUser() {
    let t = localStorage.getItem("chat_app_user_token");
    emitEvent("status_change", { token: t, socketListenId: `user_${t}`, type: "leave" });
    localStorage.removeItem("chat_app_user_token");
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <div className="header">
          <Icon onClick={() => this.showDrawer()}
            type="menu"
            style={{ color: 'rgba(255,255,255)', padding: 20 }} />
          <span>{this.state.currentUser.username || "Please select to Chat"}</span>
          <a onClick={() => this.logoutUser()} className="logout">Logout</a>
        </div>
        <Drawer
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <br /> <br />
          <h3 style={{ textAlign: "center" }}>Menu</h3>
          <p onClick={async () => {
            this.onClose();
            this.setState({ messageList: [], currentUser: "" })
          }}
            className="userList">Home</p>
          <div style={{ width: "100%", backgroundColor: "#000", height: "2px" }}></div>
          <br />
          <h3 style={{ textAlign: "center" }}>Online Users</h3>
          {this.state.usersList.map(u => {
            return <p
              onClick={async () => await this.onUserSelected(u)}
              key={u.socketListenId}
              className="userList">{u.username}</p>
          })}
        </Drawer>
        <br />
        <div className="message-list">
          {this.state.messageList.map((m, i) => m.received ? <span key={i} className="message-cloud received-text">{m.message}</span> : <span key={i} className="message-cloud">{m.message}</span>)}
        </div>
        <div style={{ width: '100%', height: '200px', float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
        {this.state.currentUser == "" ? (<div style={{ marginTop: "-20px", display: "flex", alignItems: 'center', justifyContent: "center", flexDirection: "column", width: "100%" }}>
          <img src={liveChat} alt="Logo" style={{ width: "300px", height: "300px" }} />
          <br />
          <h3 style={{ textAlign: "center" }}>Click on Menu <Icon onClick={() => this.showDrawer()}
            type="menu"
            style={{ color: 'rgba(0,0,0)', padding: 20 }} /> to see chat with people in Online</h3>
        </div>) : (<div className="chat-text-box">
          <Search
            placeholder="Type your Message"
            enterButton="Send"
            size="large"
            onChange={(event) => this.setState({ typedMessage: event.target.value })}
            value={this.state.typedMessage}
            onSearch={value => {
              if (value == "") return;
              this.onMessage({ message: value, received: false });
              emitEvent("message", { message: value, socketListenId: this.state.currentUser.socketListenId, senderSocketId: `user_${localStorage.getItem("chat_app_user_token")}` });
              this.setState({ typedMessage: "" });
            }}
          />
        </div>)}
      </div>
    );
  }
}
export default Chat;