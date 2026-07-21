const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const indexRoutes = require('./routes/index');
const serviceRoutes = require('./routes/services');
const podcastRoutes = require('./routes/podcast');
const bookingRoutes = require('./routes/bookings');

app.use('/', indexRoutes);
app.use('/services', serviceRoutes);
app.use('/podcast', podcastRoutes);
app.use('/book-now', bookingRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Mindset.i server running on http://localhost:${PORT}`);
    console.log(`Philosophy: "All that you are looking for is at the place you are looking from."`);
});