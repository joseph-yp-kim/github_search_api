import styled from 'styled-components';

const RepoItem = styled.li`
  border: 1px solid black;
  text-align: left;
  margin-bottom: 10px;
  padding: 10px;
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

  return <ul>{repoItems}</ul>;
}

export default RepoList;
