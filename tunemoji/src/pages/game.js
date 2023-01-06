import React, { useEffect, useState } from 'react';

function Game({ gameState, setGameState }) {
    const [value, setValue] = useState('');
    const [emojis, setEmojis] = useState('');
    const [songList, setSongList] = useState();
    const [songIndex, setSongIndex] = useState(0);
    useEffect(() => {        
        handleShuffleTracks(gameState.playlist.playlistTracks)
    }, [0])

    useEffect(() => {
        handleEmojis(gameState.playlist.playlistTracks[songIndex].track.name)
    }, [songIndex])

    const handleShuffleTracks = (arr) => {
        console.log(arr);
         for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
         }
        return arr;
    }
    
    const handleTextInput = (event) => {
        event.preventDefault()
        setValue(event.target.value)
    }

    const handleEmojis = (songName) => {
        fetch('/openai/chatgpt', {
            method: 'POST',
            body: new URLSearchParams({
                text: songName
            })
        })
            .then(response => response.json())
            .then(data => setEmojis(data))
    }

    const handleCheckAnswer = () => {
        setSongIndex(songIndex + 1)
    }

    return (
        <div className='container background'>
            <div className="header game-header">
                <div className="game-upper">
                    <div className='game-playlist'>
                        <img src={gameState.playlist.playlist.images[0].url} />
                        <p>{gameState.playlist.playlist.name}</p>
                    </div>
                    <div className="game-score">
                        <h1>Score</h1>
                        <p>{gameState.score}</p>
                    </div>
                </div>
                <div className="game-body">
                    <div className="game-points">
                        <h1>50 points</h1>
                    </div>
                    <div className="game-emojis">
                        {gameState.playlist.playlistTracks[songIndex].track.name}
                        {emojis}
                    </div>
                    <div className="game-input">
                        <input type="text" value={value} onChange={handleTextInput}/>
                    </div>
                    <div className="game-submit">
                        <div onClick={() => handleCheckAnswer()} className="submit-button">
                            <span>Submit</span>
                        </div>
                    </div>
                </div>
                
               
            </div>
            <div className="game-lower">
                <div className="game-hint">
                    <div className="hint-button">
                        <span>Hint (for 50 points)</span>
                    </div>
                </div> 
                <div className="game-skip">
                    <div className="skip-button">
                        <span>Skip this song</span>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Game;