import './App.css';
import Header from './components/header';
import CharacterTable from './components/CharacterTable';
import Search from './components/Search';
import axios from 'axios';
import React, {useEffect,useState} from 'react';
import API from './api';

function App() {
  const[items,setItems] = useState([])
  const[isLoading,setLoading] = useState(true)
  const[query,setQuery] = useState((''))

  useEffect(()=>{
    const fetch = async() => {
      if(query === ""){
        const result = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${API}`)
        console.log(result.data.data.results)
        setItems(result.data.data.results)
        setLoading(false)
      }else{
        const result = await axios.get(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=${API}`)
        console.log(result.data.data.results)
        setItems(result.data.data.results)
        setLoading(false)
      }
    }
    fetch()
  },[query])

  return (
    <div className="container">
      <Header />
      <Search search = {(q)=>setQuery(q)}></Search>
      <CharacterTable items={items} isLoading = {isLoading} />
    </div>
  );
}

export default App;
