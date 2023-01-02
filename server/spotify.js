require('dotenv').config();
const express = require('express');
const router = express.Router();

// AUTHORIZATION
router.get('/authorizeSpotify', async (req, res) => {
    const url = 'https://accounts.spotify.com/authorize?';
    const scope = 'user-read-private user-read-email user-top-read user-library-read';
    const redirectUrl = (url + new URLSearchParams([
        ['response_type', 'code'],
        ['client_id', process.env.client_id],
        ['scope', scope],
        ['redirect_uri', process.env.redirect_uri],
        ['dialog', 'true']
    ]).toString());
    res.json(redirectUrl);
})

// obtain access and refresh tokens
// callback route after authorizeSpotify is accessed
router.get('/callback', async (req, res) => {
    if (req.query.code) {
        const url = 'https://accounts.spotify.com/api/token';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': 'Basic ' + (new Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64'))
        };
        
        fetch(url, {
            method: 'POST',
            headers,
            body: new URLSearchParams({
                'grant_type': 'authorization_code',
                'code': req.query.code,
                'redirect_uri': process.env.redirect_uri,
            })
        })
            .then(res => res.json())
            .then(credentials => {
                // pass tokens to front-end through URL
                res.redirect(`${process.env.auth_redirect_uri}/?` +
                    new URLSearchParams({
                        access_token: credentials.access_token,
                        refresh_token: credentials.refresh_token
                    })
                );
        })
    }
})

// get user playlists 'On Repeat' and 'Your 2022 Spotify Wrapped'
router.post('/getPlaylists', async (req, res) => {
    console.log(req.body);
    const url = 'https://api.spotify.com/v1/search?' + new URLSearchParams([
        ['query', req.body.playlistName],
        ['type', 'playlist']
    ]);
    const headers = {
        'Authorization': 'Bearer ' + req.body.access_token,
        'Content-Type': 'application/json'
    }

    fetch(url, {
        method: 'GET',
        headers,      
    })
        .then(response => response.json())
        .then(data => res.json(data))    
    
})

// get tracks from a playlist given a playlistId
router.post('/getTracks', async (req, res) => {
    const url = `https://api.spotify.com/v1/playlists/${req.body.playlistId}/tracks`;
     const headers = {
        'Authorization': 'Bearer ' + req.body.access_token,
        'Content-Type': 'application/json'
    }

    fetch(url, {
        method: 'GET',
        headers,      
    })
        .then(response => response.json())
        .then(data => res.json(data))    
})


module.exports = router;