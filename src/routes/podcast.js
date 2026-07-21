const express = require('express');
const router = express.Router();

// Podcast page
router.get('/', (req, res) => {
    res.render('pages/podcast', {
        title: 'Conversations with Mystics — Mindset.i'
    });
});

module.exports = router;