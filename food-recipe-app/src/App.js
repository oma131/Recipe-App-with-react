import React, {useEffect, useState} from 'react';
import Recipe from "./Recipe";
import './App.css';


const App = () => {
const APP_ID = '17eb2e10';
const APP_KEY = '31dec0e38c6f6b707579323a1762ac22';

const [recipes, setRecipies] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState ('chicken');

useEffect(() =>{
  getRecipes ();
}, [query]);

const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json()
      setRecipies(data.hits);
      console.log (data.hits);
      };

      const updateSearch = e => {
        setSearch(e.target.value);
        };

      const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
      }

 return (
    <div className="App">
      <form onSubmit={getSearch} className= "searchForm">
        <input className= "searchBar" type="text" value={search} onChange = {updateSearch} />
        <button  className="searchButton" type= "submit">
          Search
          </button>
      </form>
      <div className="recipe">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;

