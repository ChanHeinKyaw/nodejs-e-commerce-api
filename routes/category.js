const router = require("express-promise-router")();
const controller = require("../controllers/category");
const { saveFile } = require("../utils/gallery");

router.get("/", controller.all);
router.post("/", saveFile, controller.add);
router.delete("/:id", controller.drop);

router
  .route("/:id")
  .get(controller.get)
  .put(saveFile, controller.put)
  .delete(controller.drop);

module.exports = router;
