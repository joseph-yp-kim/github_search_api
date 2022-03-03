import { useState, useEffect } from 'react';
import './App.css';
import SearchResults from './SearchResults';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [didAttemptSearch, setDidAttemptSearch] = useState(false);

  let searchTimeout;
  const handleSearchInputChange = (e) => {
    clearTimeout(searchTimeout);
    const searchInputText = e.target.value;
    searchTimeout = setTimeout(() => {
      console.log('====>', searchInputText);
      if (!searchInputText) {
        setSearchResults([]);
        setIsLoading(false);
        setDidAttemptSearch(false);
        return;
      }
      fetchRepos(searchInputText);
    }, 500);
  };

  const fetchRepos = async (query) => {
    setIsLoading(true);
    setDidAttemptSearch(true);
    const res = await fetch(`/api/github/repos?search=${query}`);
    const results = await res.json();
    setSearchResults(results);
    setIsLoading(false);
    console.log('results:', results);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <input onChange={handleSearchInputChange}></input>
        {isLoading && <span>loading results...</span>}
        {!isLoading && didAttemptSearch && !searchResults.length && (
          <span>Sorry... no matching results found</span>
        )}
        {!isLoading && <SearchResults repos={searchResults} />}
      </header>
    </div>
  );
}

export default App;
