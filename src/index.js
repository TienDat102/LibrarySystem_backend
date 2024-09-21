const express = require('express');
const connectDB = require('./database/db');
const dotenv = require('dotenv');
const app = express();
const recommendRoute = require('./routes/recommend.route');
const borrowRoute = require('./routes/borrow.route');
const authRoute = require('./routes/auth.route');
const bookRoute = require('./routes/book.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.use(cors({
    origin: ["http://localhost:3000", "https://librarysystem-nhom5.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

// Các route
app.use("/api/v1", bookRoute);
app.use("/api/v1", authRoute);
app.use('/api/v1', borrowRoute);
app.use('/api/v1', recommendRoute);

// Kết nối cơ sở dữ liệu và lắng nghe
connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server started on port: http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
