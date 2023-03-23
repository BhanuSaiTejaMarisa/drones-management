import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useUser from '../../utils/auth/useUser';
import "./Socket.scss"
const socket = io('http://localhost:5000', { withCredentials: true });

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { user } = useUser();
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', { email: user.email, message: inputValue });
    setInputValue('');
  };
  console.log(messages, user);
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
      <ul>
        {messages.map(({ email, message }, i) => (
          <li key={i} className={user.email === email ? "sent" : "received"}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;