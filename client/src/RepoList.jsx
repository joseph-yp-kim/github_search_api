import styled from 'styled-components';

const ListWrapper = styled.div`
  display: table;
  margin: 0 auto;
  height: 100%;
`;

const List = styled.ul`
  padding: 10px;
  list-style-type: none;
  text-align: center;
  overflow: scroll;
  height: 100%;
`;

const RepoItem = styled.li`
  border: 1px solid black;
  border-radius: 3px;
  text-align: left;
  margin-bottom: 10px;
  padding: 10px;
  transition: left ease 0.5s;
  position: relative;
  left: 0;
  width: 500px;
  &:hover {
    cursor: pointer;
    left: -10px;
    background-color: #202124;
  }
`;

const RepoDescription = styled.p`
  margin: 0px;
`;

function RepoList({ repos }) {
  const handleItemClick = (url) => {
    window.open(url);
  };

  const repoItems = repos.map((repo, i) => (
    <RepoItem key={i} onClick={() => handleItemClick(repo.url)}>
      <RepoDescription>
        {repo.name} by {repo.owner}
      </RepoDescription>
      <RepoDescription>{repo.description}</RepoDescription>
      <RepoDescription>Stars: {repo.starCount}</RepoDescription>
    </RepoItem>
  ));

  return (
    <ListWrapper>
      <List>{repoItems}</List>
    </ListWrapper>
  );
}

export default RepoList;
