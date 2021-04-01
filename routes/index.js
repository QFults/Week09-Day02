const router = require('express').Router()

router.use('/api', require('./bookRoutes.js'))
router.use('/', require('./viewRoutes.js'))

module.exports = router
