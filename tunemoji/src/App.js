import React, { useState } from 'react';
import Login from './pages/login';
import Loading from './pages/loading';
import Setup from './pages/setup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './styles/app.scss';
import Game from './pages/game';

function App() {  
  const [access_token, setAccess_token] = useState('');
  const [refresh_token, setRefresh_token] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [gameState, setGameState] = useState({
    playlist: {}, // playlist object from 'playlists' state
    gameMode: '', // match or guess
    score: 0
  });
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login setAccess_token={setAccess_token} setRefresh_token={setRefresh_token}/>} />
        <Route path='/loading' element={<Loading access_token={access_token} refresh_token={refresh_token} playlists={playlists} setPlaylists={setPlaylists} />} />
        <Route path='/setup' element={<Setup playlists={playlists} gameState={gameState} setGameState={setGameState} />} />
        <Route path='/game' element={<Game gameState={gameState} setGameState={setGameState} />}/>
      </Routes>
    </Router>    
  );
}

export default App;
