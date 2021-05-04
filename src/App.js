import React, {useState} from 'react';
import TwetCard from './TwetCard';
import {TextField, Button, Grid } from '@material-ui/core';
const { ipcRenderer } = window.require('electron');


function App() {
  const [user, setUser] = useState('');
  const [searches, setSearches] = useState([]);

  return (
    <div className="App">
      <Grid container xs ={12} alignContent={'center'} justify={'center'}>
        <TextField id="standard-basic" label="User Name" onChange={event => {
          const { value } = event.target;
          setUser(value);
        }} />
        <Button variant="contained" color="primary" onClick={()=>{
          if(user !== '') {
            ipcRenderer.send('get-tweets', user)
            ipcRenderer.on('get-tweets-reply', (event, search) => {
              if (search.tweets.length > 0) {
                const searchesTemp = [...searches];
                if(searchesTemp.length === 5) {
                  searchesTemp.splice(-1,1)
                }

                searchesTemp.unshift(search);
                setSearches(searchesTemp);
              }
            })
          }
        }}>
          Get Tweets From
        </Button>
      </Grid>

      <Grid container justify="space-around" alignItems="center">
      {(searches.length > 0) && searches.map(search => {
          return <div>
            <h1>{search.user}</h1>
            {search.tweets.map(tweet => {
              return (
                <Grid xs={12} style={{ margin: '10px' }}>
                  <TwetCard tweet={tweet} />
                </Grid>
              )
            })}
          </div>
        })}
      </Grid>
    </div>
  );
}

export default App;