const express = require('express');
const router = express.Router();

// Services page
router.get('/', (req, res) => {
    res.render('pages/services', {
        title: 'Our Services — Mindset.i'
    });
});

module.exports = router;