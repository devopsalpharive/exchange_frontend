// import package
import io from 'socket.io-client';

// import lib
import config from './env';
import toast from 'react-hot-toast';
import { setConnectionState } from '../actions/commonReduxAction';
import { jwtDecode } from 'jwt-decode';
// console.log(config, 'http://localhost:2002');
const socket = io(config.SOCKET_URL, { transports: ['polling'] });

const createSocketUser = (userId) => {
  socket.emit('CREATEROOM', userId)
}
const createRoomForChat = (ticketId) => {
  socket.emit('createRoomForChat', ticketId)
}

const Reconnect = () => {
  try {
    const token = localStorage.token;
    if (!isEmpty(token)) {
      const decoded = jwtDecode(token);
      createSocketUser(decoded.userId)
    }
  } catch (err) {

  }
}

socket.on('connect', (reason) => {
  // toast.error('Your network is too low, please reload the page')
  console.log(socket.connected, socket.disconnected, socket.active, 'Socket_status')
  if (socket.connected) {
    setConnectionState('connected')
    Reconnect()
    // toast.success('Socket connected')
  }
});

socket.on('disconnect', (reason) => {
  console.log(socket.connected, socket.disconnected, socket.active, 'Socket_disconnect', reason)
  if (reason == 'transport close') {
    // toast.success('network swtiching')
    setConnectionState('switch')
  }
  else if (reason == 'transport error') {
    setConnectionState('notconnected')
  }
  else if (reason == 'io server disconnect') {
    setConnectionState('notconnected')
    socket.connect()
  }
  else if (reason == 'io client disconnect') {
    setConnectionState('notconnected')
    socket.connect()
  }
  else if (socket.disconnected) {
    setConnectionState('disconnected')
    // toast.error('Not connected to the Internet. Please connect and try again.')
  }
  if (!socket.active) {
    setConnectionState('notconnected')
    socket.connect()
  }
  // toast.error('Your network is too low, please reload the page')
});

socket.on("connect_error", (error) => {
  if (socket.active) {
    setConnectionState('reconnecting')
  } else {
    // the connection was denied by the server
    // in that case, `socket.connect()` must be manually called in order to reconnect
    setConnectionState('notconnected')
    socket.connect()
  }
});


socket.on('reconnect', (reason) => {
  console.log(socket.connected, socket.disconnected, 'Socket_status')
  setConnectionState('reconnecting')
  // toast.error('Your network is too low, please reload the page')
  // toast.success('Socket reconnecting...')
});

// Support Ticket Chat-------------------------------->

const sendReply = (ticketId) => {
  socket.emit('createRoomForChat', ticketId)
}
const sendMessage = (ticketId) => {
  socket.emit('sendMessage', ticketId)
}

// useEffect(() => {
//   socket.on('ticketChatMessage', data => {
//     setMessage(data.message)
//   })

//   socket.on('receiveMessage', data => {
//     setMessage(data.message)
//   })
// })



export {
  socket,
  createSocketUser,
  createRoomForChat
}