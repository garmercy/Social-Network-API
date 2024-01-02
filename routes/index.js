const router = require('express').Router();
const userRoutes = require('./api/userRoutes');

router.use('/users', userRoutes);
router.use((req, res) => {
    res.status(404).send("<h1> 404 Error!</h1>");
});

module.exports = router;