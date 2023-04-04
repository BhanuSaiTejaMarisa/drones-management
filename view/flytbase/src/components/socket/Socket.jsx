import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useUser from '../../utils/auth/useUser';
import "./Socket.scss"
const socket = io('http://localhost:5000', { autoConnect: false, withCredentials: true });

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socketUsers, setSocketUsers] = useState([]);
  const [currentSocketUser, setCurentSocketUser] = useState({})
  const [usernameSelected, setUsernameAlreadySelected] = useState(false)
  const { user: { email } } = useUser();

  socket.on('chat message', (msg) => {
    setMessages([...messages, msg]);
  });

  socket.onAny((event, ...args) => {
    console.log({ event, args });
  });

  function onUsernameSelection(username) {
    setUsernameAlreadySelected(true);
    socket.auth = { username };
    socket.connect();
  }

  socket.on("user connected", user => {
    setCurentSocketUser(user);
    let totalUsers = socketUsers.filter(user => user.username !== email)
    setSocketUsers([...socketUsers, user]);
    console.log("calling user connected", { user, socketUsers });
  })

  socket.on("users", (users) => {
    // let [currentUser] = users.filter(user => user.userId === socket.id)
    // setCurentSocketUser(currentUser);
    setSocketUsers([...users])
    console.log("calling users", { users });
  })

  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      this.usernameAlreadySelected = false;
    }
  });
  function destroyed() {
    socket.off("connect_error");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', { username: email, message: inputValue });
    setInputValue('');
  };
  console.log({ messages, email });// currentSocketUser, socketUsers 


  return (
    <div className='Socket'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {
        socketUsers.map(({ username }, index) => <div key={index}>{username}</div>)
      }
      <ul>
        {messages.map(({ username, message }, i) => (
          <li key={i} className={email === username ? "sent" : "received"}>{message}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;