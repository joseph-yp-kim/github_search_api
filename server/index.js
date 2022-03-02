require('dotenv').config();
const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 3001;
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

const app = express();

app.get('/api/github/repos', async (req, res, next) => {
  try {
    const search = req.query.search;
    const response = await axios({
      method: 'get',
      url: `https://api.github.com/search/repositories?q=${search}&sort=stars`,
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
