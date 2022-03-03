import { useState } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import styled from 'styled-components';

const SearchInput = styled.input`
  width: 400px;
  height: 30px;
  border-radius: 5px;
  border: none;
  padding: 0px 5px;
  &:focus {
    outline: none;
  }
`;

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [didAttemptSearch, setDidAttemptSearch] = useState(false);

  let searchTimeout;
  const handleSearchInputChange = (e) => {
    clearTimeout(searchTimeout);
    const searchInputText = e.target.value;
    searchTimeout = setTimeout(() => {
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
    const res = await fetch(`/api/github/repos?q=${query}`);
    const results = await res.json();
    setSearchResults(results);
    setIsLoading(false);
  };

  return (
    <div className='app'>
      <SearchInput
        onChange={handleSearchInputChange}
        placeholder={'Search for Github repos by star ranking'}
      />
      {isLoading && <p>loading results...</p>}
      {!isLoading && didAttemptSearch && !searchResults.length && (
        <p>Sorry... no matching results found</p>
      )}
      {!isLoading && <SearchResults repos={searchResults} />}
    </div>
  );
}

export default App;
