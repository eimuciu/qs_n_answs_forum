const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT } = require('./config');

const app = express();

// route imports
const { userRoutes } = require('./routes/userRoute');
const { questionRoutes } = require('./routes/questionRoute');
const { answerRoutes } = require('./routes/answerRoute');

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);

app.all('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log('Server is running on ', PORT);
});
