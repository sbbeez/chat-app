import { LOGIN, SIGN_UP, GET_RECENT_CHAT } from "./url";
import { message } from 'antd';

export const loginUser = async (body, history) => {
  try {
    let result = await fetch(LOGIN, { method: "POST", body: JSON.stringify(body) });
    let res = await result.json();
    if (result.status == 200) {
      localStorage.setItem("chat_app_user_token", res.token);
      history.push("/chat");
    } else {
      message.error(res.message);
    }
    return res;
  } catch (err) {
    console.log(err.toString());
  }
}

export const signUpUser = async (body, history) => {
  try {
    let result = await fetch(SIGN_UP, { method: "POST", body: JSON.stringify(body) });
    let res = await result.json();
    if (result.status == 200) {
      localStorage.setItem("chat_app_user_token", res.token);
      history.push("/chat");
    } else {
      message.error(res.message);
    }
    return res;
  } catch (err) {
    console.log(err.toString());
  }
}


export const getRecentChat = async (user_socket_id, sender_socket_id) => {
  try {
    let result = await fetch(`${GET_RECENT_CHAT}?userSocketId=user_${[user_socket_id.split("_")[1], sender_socket_id.split("_")[1]].sort().join("_user_")}`, { method: "GET" });
    let res = await result.json();
    return res;
  } catch (err) {
    console.log(err.toString());
  }
}