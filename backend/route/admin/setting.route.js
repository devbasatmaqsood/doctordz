const express = require("express");
const route = express.Router();

const admin = require('../../middleware/admin');;
const settingController = require('../../controller/admin/setting.controller')
const checkAccess = require("../../middleware/checkAccess");

route.use(admin);
route.use(checkAccess());

route.get('/',  settingController.get);
route.patch('/update',  settingController.update);
route.put('/handleSwitch',  settingController.handleSwitch);



module.exports = route;