import { useState } from 'react';
import './App.css';
import RepoList from './RepoList';
import styled from 'styled-components';

const SearchInputWrapper = styled.div`
  height: 53px;
  width: 522px;
  margin: 0px auto;
  text-align: left;
`;

const SearchInput = styled.input`
  margin-top: 20px;
  width: 393px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #d1d7dd;
  padding: 0px 5px;
  background-color: #f6f8fa;
  &:focus {
    outline: none;
  }
`;

const ClearSearchButton = styled.button`
  border-radius: 6px;
  border: 1px solid #d1d7dd;
  padding: 7.5px 12px;
  margin-left: 15px;
  &:hover {
    cursor: pointer;
  }
`;

function App() {
  const [repos, setRepos] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [didAttemptSearch, setDidAttemptSearch] = useState(false);

  let searchTimeout;
  const handleSearchInputChange = (e) => {
    const searchInputText = e.target.value;
    setSearchInput(searchInputText);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (!searchInputText) {
        setRepos([]);
        setIsLoading(false);
        setDidAttemptSearch(false);
        return;
      }
      searchRepos(searchInputText);
    }, 500);
  };

  const searchRepos = async (query) => {
    setIsLoading(true);
    setDidAttemptSearch(true);
    const res = await fetch(`/api/github/repos?q=${query}`);
    const results = await res.json();
    setRepos(results);
    setIsLoading(false);
  };

  const handleClearSearchClick = () => {
    setSearchInput('');
    setRepos([]);
    setDidAttemptSearch(false);
  };

  return (
    <div className='app'>
      <SearchInputWrapper>
        <SearchInput
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder={'Search for Github repos by star ranking'}
        />
        {didAttemptSearch && (
          <ClearSearchButton onClick={handleClearSearchClick}>Clear search</ClearSearchButton>
        )}
      </SearchInputWrapper>
      {isLoading && <p>loading results...</p>}
      {!isLoading && didAttemptSearch && !repos.length && <p>Sorry... no matching results found</p>}
      {!isLoading && <RepoList repos={repos} />}
    </div>
  );
}

export default App;
