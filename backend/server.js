const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const port = process.env.PORT || 8080;
app.use(cors("*"));
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
