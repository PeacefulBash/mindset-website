const express = require('express');
const router = express.Router();

// Homepage
router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Mindset.i — Inspire Change. Awaken Potential.'
    });
});

// About page
router.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About Mindset.i'
    });
});

module.exports = router;