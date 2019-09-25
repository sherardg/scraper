var router = require("express").Router();
var headlineController = require("../../controllers/headlines");

router.get("/", headlineController.findAll);
router.delete("/:id", headlineController.delete);
router.put("/:id", headlineController.update);

module.exports = router;
