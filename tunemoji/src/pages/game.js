import React, { useState } from 'react';

function Game({ playlists, gameState, setGameState }) {
    const [gameConfigScreen, setGameConfigScreen] = useState('playlist');
    const handleSelectPlaylist = (playlist) => {
        setGameState({
            ...gameState,
            playlist
        })
        setGameConfigScreen('gameMode')
    }

    return (
        <div className='container background'>
            <div className='header game-header'>
                <h1 className='logo'>tunemoji</h1>
                {
                    gameConfigScreen === 'playlist' && (
                    <>
                    <p>Pick a playlist</p>
                    <div className='playlist-picker'>
                        {
                            playlists.map((item) => {
                                return (
                                    <div onClick={() => handleSelectPlaylist(item)} className='playlist-container'>                                    
                                        <img src={item.playlist.images[0].url} />
                                        <span>{item.playlist.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </>
                    )
                }
                {
                    gameConfigScreen === 'gameMode' && (
                    <>
                    <p>Pick a game mode</p>
                    <div className='picker'>
                        <div className='game-mode-button-container'>
                            <div className='game-mode-button'>
                                <span>Matching game</span>        
                            </div>     
                        </div>
                        <div className='game-mode-button-container'>
                            <div className='game-mode-button'>
                                <span>Guess the song</span>        
                            </div>     
                        </div>                                            
                    </div>
                    </>
                    )
                }
                
            </div>
        </div>
    )
}

export default Game;