const itemsRouter = require("express").Router();
const Item = require("../models/item");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const _ = require("lodash");

itemsRouter.get("/",
  middleware.getToken,
  async (req, res) => {

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: "token missing or invalid"
      });
    }
    const user = await User.findById(decodedToken.id);
    console.log(user)

    const isMine = req.query.isMine;
    const status = req.query.status;
    // const maxPrice = req.query.maxPrice;
    // const minPrice = req.query.minPrice;

    // const oPrice = req.query.oPrice; // Must be 'asc' or 'desc'
    // const oDate = req.query.oDate; // Must be 'asc' or 'desc'

    let vendors = await Item.find({}).populate("user", {
      vendors: 0
    });

    if (isMine) vendors = _.filter(vendors, function (vendor) {
      return vendor.user.id.indexOf(user._id) > -1;
    });

    if (status) vendors = _.filter(vendors, (vendor) => vendor.status.includes(status));

    // if (maxPrice) vendors = _.filter(vendors, (o) => o.price <= maxPrice);
    // if (minPrice) vendors = _.filter(vendors, (o) => o.price >= minPrice);

    // if (oPrice) vendors = _.orderBy(vendors, ["price"], [oPrice]);
    // if (oDate) vendors = _.orderBy(vendors, ["date"], [oDate]);

    res.json(vendors);
  });

itemsRouter.post(
  "/",
  middleware.getToken,
  async (req, res) => {
    const body = req.body;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: "token missing or invalid"
      });
    }

    const user = await User.findById(decodedToken.id);

    const item = new Item({
      code: body.code,
      vendorName: body.vendorName,
      sum: body.sum,
      currency: body.currency,
      status: body.status,
      date: body.date,
      dueDate: body.dueDate,
      createAt: new Date(),
      user: user._id,
    });
    const savedItem = await item.save();

    user.vendors = user.vendors.concat(savedItem._id);
    await user.save();
    res.json(savedItem);
  }
);


itemsRouter.put(
  "/:id",
  middleware.getToken,
  async (req, res) => {
    const body = req.body;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: "token missing or invalid"
      });
    }

    const foundItem = await Item.findById(req.params.id);

    if (foundItem.user.toString() === decodedToken.id) {
      await Item.updateOne({
        "_id": req.params.id
      }, {
        $set: {
          "status": body.status
        }
      });
      res.send('OK');
    } else {
      res.status(401).json({
        error: "user not allowed to edit this item"
      });
    }
  }
);

module.exports = itemsRouter;
