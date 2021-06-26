import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import './App.css';
import Header from './Header';
import PokemonCard from './PokemonCard';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();
  const [pokemon,setPokemon] = useState([]);

  useEffect(()=>{
    async function getPokemon(){
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      const data = await response.json();
      
      setPokemon(data.results);
    }
    getPokemon();
  },[]);
  
  return (
    <div className="App">
      <Header message="Pokemon App" />
      <Container className={classes.cardGrid}>
        <Grid container justify="center" spacing={6} alignItems="center">
          {pokemon.map((poke)=>{
            return (
              <Grid item key={poke.name}>
                <PokemonCard url={poke.url}/>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
