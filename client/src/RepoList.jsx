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
  border: 1px solid #d1d7dd;
  border-radius: 3px;
  text-align: left;
  margin-bottom: 10px;
  padding: 10px;
  transition: left ease 0.5s;
  position: relative;
  left: 0;
  width: 500px;
  background-color: #f6f8fa;
  &:hover {
    cursor: pointer;
    left: -10px;
  }
`;

const RepoText = styled.p`
  margin-top: 0px;
  margin-bottom: 5px;
`;

const RepoOwnerText = styled.span`
  color: #2a6bd3;
`;

const RepoNameText = styled(RepoOwnerText)`
  font-weight: bold;
`;

function RepoList({ repos }) {
  const handleItemClick = (url) => {
    window.open(url);
  };

  const repoItems = repos.map((repo, i) => (
    <RepoItem key={i} onClick={() => handleItemClick(repo.url)}>
      <RepoText>
        Repo: <RepoNameText>{repo.name}</RepoNameText>
      </RepoText>
      <RepoText>
        Owner: <RepoOwnerText>{repo.owner}</RepoOwnerText>
      </RepoText>
      <RepoText>Stars: {repo.starCount}</RepoText>
      <RepoText>About: {repo.description}</RepoText>
    </RepoItem>
  ));

  return (
    <ListWrapper>
      <List>{repoItems}</List>
    </ListWrapper>
  );
}

export default RepoList;
