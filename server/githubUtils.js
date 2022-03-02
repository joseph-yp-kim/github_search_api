const axios = require('axios');

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

async function getGithubReposByStars(search) {
  const response = await axios({
    method: 'get',
    url: `https://api.github.com/search/repositories?q=${search}&sort=stars`,
    headers: {
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
  });
  return response.data.items.map((repo) => {
    return {
      name: repo.name,
      owner: repo.owner.login,
      description: repo.description,
      starCount: repo.stargazers_count,
      url: repo.html_url,
    };
  });
}

exports.getGithubReposByStars = getGithubReposByStars;
