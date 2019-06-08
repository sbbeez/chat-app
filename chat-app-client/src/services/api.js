import { LOGIN } from "./url";

export const loginUser = async (body, history) => {
  try {
    let result = await fetch(LOGIN, { method: "POST", body: JSON.stringify(body) });
    let res = await result.json();
    localStorage.setItem("chat_app_user_token", res.token);
    history.push("/chat");
    return res;
  } catch (err) {
    console.log(err.toString());
  }
}