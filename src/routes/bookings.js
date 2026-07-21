const express = require('express');
const router = express.Router();

// Booking page (GET - show the form)
router.get('/', (req, res) => {
    res.render('pages/booking', {
        title: 'Book a Session — Mindset.i'
    });
});

// Booking form submission (POST)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, organization, service, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !service) {
            return res.status(400).render('pages/error', {
                title: 'Something Went Wrong — Mindset.i',
                message: 'Please fill in all required fields.',
                code: 400
            });
        }
        
        // Here you would normally save to PostgreSQL:
        // const query = 'INSERT INTO enquiries(name, email, phone, organization, service, message) VALUES($1, $2, $3, $4, $5, $6)';
        // await pool.query(query, [name, email, phone, organization, service, message]);
        
        // For now, simulate success
        console.log('New enquiry received:', { name, email, service, organization });
        
        // Redirect to success page with enquiry data
        res.render('pages/success', {
            title: 'Enquiry Received — Mindset.i',
            name: name,
            service: service
        });
        
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).render('pages/error', {
            title: 'Something Went Wrong — Mindset.i',
            message: 'We could not process your enquiry. Please try again or contact us directly.',
            code: 500
        });
    }
});

module.exports = router;