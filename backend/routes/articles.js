import express from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data/articles.json');

const router = express.Router();

function readArticles() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

function writeArticles(articles) {
  fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2));
}

router.get('/', (req, res) => {
  const articles = readArticles();
  const list = articles.map(({ id, title, theme, createdAt, updatedAt }) => ({
    id, title, theme, createdAt, updatedAt
  }));
  res.json({ success: true, data: list });
});

router.get('/:id', (req, res) => {
  const articles = readArticles();
  const article = articles.find(a => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }
  res.json({ success: true, data: article });
});

router.post('/', (req, res) => {
  const { title, content, theme } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content required' });
  }

  const articles = readArticles();
  const now = new Date().toISOString();
  const article = {
    id: uuidv4(),
    title,
    content,
    theme: theme || 'default',
    createdAt: now,
    updatedAt: now
  };

  articles.push(article);
  writeArticles(articles);

  res.status(201).json({ success: true, data: article });
});

router.put('/:id', (req, res) => {
  const { title, content, theme } = req.body;
  const articles = readArticles();
  const index = articles.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }

  articles[index] = {
    ...articles[index],
    title: title ?? articles[index].title,
    content: content ?? articles[index].content,
    theme: theme ?? articles[index].theme,
    updatedAt: new Date().toISOString()
  };

  writeArticles(articles);
  res.json({ success: true, data: articles[index] });
});

router.delete('/:id', (req, res) => {
  const articles = readArticles();
  const index = articles.findIndex(a => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }

  articles.splice(index, 1);
  writeArticles(articles);

  res.json({ success: true, message: 'Article deleted' });
});

export default router;
