const clientID = 'cb680117cadd43d6b1fa6e6255fa9a42';
const redirectURI = 'http://localhost:3000/';
let token;

const Spotify = {
  getAccessToken(){
    if(token){
      return token;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expireMatch) {
      token = tokenMatch[1];
      let expiresIn = Number(expireMatch[1]);

      window.setTimeout(() => token = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },

  search(searchTerm) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then( response => {
          return response.json();
        }).then( jsonResponse => {
            if(!jsonResponse.tracks) {
              return [];
            } else {
              return jsonResponse.tracks.items.map( track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              }));
            }
          });

  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};

    let userID;

    return fetch('https://api.spotify.com/v1/me', { headers: headers }
      ).then( response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error obtaining UserID');
      }).then( jsonResponse => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify,com/v1/users/${userID}/playlists`, { method: 'POST', headers: headers, body: JSON.stringify({name: playlistName})}).then(
          response => {
            if (response.ok){
              return response.json()
            }
            throw new Error('Error creating a playlist');
          }
        ).then(
          jsonResponse => {
            const playlistID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, { method: 'POST', headers: headers, body: JSON.stringify({ uris: trackURIs}) }).then(
              response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error('Error adding tracks to playlist');
              }
            ).catch( error => {
              console.log(`AddTrackError: ${error}`);
              return false;
            });
          }
        ).catch( error => {
          console.log(`CreatePlaylistError: ${error}`);
          return false;
        });

      }).catch( error => {
        console.log(`GetUserIDError: ${error}`);
        return false;
      });
  }

};

export default Spotify;
