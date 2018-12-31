const express = require('express'),
  router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "products connected" }));

module.exports = router;
