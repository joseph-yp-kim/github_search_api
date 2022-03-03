require('dotenv').config();
const express = require('express');
const githubUtils = require('./githubUtils');

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/github/repos', async (req, res, next) => {
  try {
    const results = await githubUtils.searchGithubReposSortByStars(req.query.q);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

app.get('/api/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
