const express = require('express');
const router = express.Router();

router.get("/admin", (req, res)=>{
    res.render('admin/admin');
});

module.exports = router;