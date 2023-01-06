import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Loading({ access_token, refresh_token, playlists, setPlaylists }) {
    const navigate = useNavigate()

    useEffect(() => {   
        handleGetPlaylist('On Repeat').then(playlist => {            
            handleGetPlaylistTracks(playlist.playlists.items[0].id)
                .then(playlistTracks => {
                    handleGetEmojis(playlistTracks.items[1].track.name)
                    const playlistObject = {
                        playlist: playlist.playlists.items[0],
                        playlistTracks: playlistTracks.items
                    
                    }
                    setPlaylists(playlists => [...playlists, playlistObject])
                      
            })
        })
        handleGetPlaylist('Your Top Songs 2022').then(playlist => {            
            handleGetPlaylistTracks(playlist.playlists.items[0].id)
                .then(playlistTracks => {
                    handleGetEmojis(playlistTracks.items[1].track.name)
                     const playlistObject = {
                        playlist: playlist.playlists.items[0],
                        playlistTracks: playlistTracks.items
                    
                    }
                    setPlaylists(playlists =>[...playlists, playlistObject])
            })
        })
      
    }, [0])

    useEffect(() => {
        if (playlists.length === 2) {
            navigate('/setup')
        }
    }, [playlists])

    // helper functions 
    const handleGetPlaylist = async (playlistName) => {        
        return fetch('/spotify/getPlaylists', {
            method: 'POST',
            body: new URLSearchParams({
                access_token,
                playlistName
            })                          
        })
            .then(response => response.json())
            .then(data => { return data })         
    }

    const handleGetPlaylistTracks = async (playlistId) => {
        return fetch('/spotify/getTracks', {
            method: 'POST',
            body: new URLSearchParams({
                access_token,
                playlistId
            })
        })
            .then(response => response.json())
            .then(data => { return data })        
    }

    const handleGetEmojis = async (trackName) => {
        console.log('emojis')
        return fetch('/openai/chatgpt', {
            method: 'POST',
            body: new URLSearchParams({
                text: trackName
            })
        })
    }

    return (
        <div className='container background'>
            <h1>Getting your Spotify information</h1>
        </div>
    )
}

export default Loading;