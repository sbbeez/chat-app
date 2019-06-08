import socketIOClient from 'socket.io-client';
let socket = null;

export const setSocket = () => {
  socket = socketIOClient('http://localhost:9090/chat');
}

export const onUserChange = (callback) => {
  socket.on('users_list_changed', (data) => callback(data));
}

export const onMessageReceived = (socketListenId, callback) => {
  socket.on(socketListenId, (data) => callback(data));
}

export const emitEvent = (event, data) => {
  socket.emit(event, data);
}