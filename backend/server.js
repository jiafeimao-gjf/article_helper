import express from 'express';
import cors from 'cors';
import articlesRouter from './routes/articles.js';

const app = express();
const PORT = 9523;

app.use(cors());
app.use(express.json());

app.use('/api/articles', articlesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
