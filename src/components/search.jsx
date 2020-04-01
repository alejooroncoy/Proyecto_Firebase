import React from 'react';
import '../assets/styles/search.scss';
const Search = () => {
    return(
        <div className="w-1/2 h-7 bg-primary rounded-md row">
           <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                            <input 
                            id='search' 
                            type="email"
                            className="font-extrabold"
                            />
                            <label htmlFor="search">Buscar...</label>
            </div>
        </div>
    )
};
export default Search;