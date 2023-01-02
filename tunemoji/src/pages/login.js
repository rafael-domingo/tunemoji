import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Login({setAccess_token, setRefresh_token }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const emojiArray = [
        '😀',
        '✌',
        '🫶',
        '💃',
        '🏃‍♂️',
        '💅',
        '💕',
        '🦄',
        '🐢',
        '🌷',
        '🪴',
        '🍑',
    ];

    useEffect(() => {
        if(searchParams.get('access_token') !== null) {
            setAccess_token(searchParams.get('access_token'))
            setRefresh_token(searchParams.get('refresh_token'))
            navigate('/loading')
        }
    }, [0])

    const handleLoginSpotify = () => {
        fetch('/spotify/authorizeSpotify')
            .then(response => response.json())
            .then(data => window.location.assign(data))  
    }

    return (
        <div className='container'>
            <div className='emoji-array'>
                {
                    emojiArray.map(emoji => {
                        return (
                            <span role='img' className='emoji'>{emoji}</span>
                        )
                    }
                    )
                }
            </div>
           
            <div className='header'>
                <h1 className='logo'>tunemoji</h1>
                <p>guess your favorite songs using only emojis</p>
            </div>            
            <div className='login-button-container'>
                <div onClick={() => handleLoginSpotify()} className="login-button">
                    <p>Login with Spotify</p>
                </div>                
            </div>

        </div>
    )
}

export default Login;
