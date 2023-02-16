const tokenModel = require("../models/token");

module.exports = {
  create: async function (req, res, next) {
    const walletInfo = req.body;
    await tokenModel.create(walletInfo, function (err, result) {
      if (err) {
        if (err.errors) {
          res.status(400).json({ message: 'Require data', errors: err.errors });
        } else {
          res.status(500).json({ message: "Internal server error", data: null });
        }
      } else {
        res.status(200).json({
          message: "Wallet info added successfully!!!",
          data: { id: result._id },
        });
      }
    });
  },
  getAll: async function (req, res, next) {
    let walletInfo = await tokenModel.find();
    res.status(200).json({ message: null, data: walletInfo });
  },
  getFilter: async function (req, res, next) {
    const filter = req.body;
    let walletInfo = await tokenModel.find(filter);
    res.status(200).json({ message: null, data: walletInfo });
  },
  getById: function (req, res, next) {
    tokenModel.findById(req.params.id, function (err, walletInfo) {
      if (err) {
        res.status(404).json({ message: "Wallet info not found", data: null });
      } else {
        res.status(200).json({ message: null, data: walletInfo });
      }
    });
  },
  updateById: function (req, res, next) {
    const walletInfo = req.body;
    tokenModel.findByIdAndUpdate(req.params.id, walletInfo, function (
      err,
      walletInfo
    ) {
      if (err) res.status(400).json({ message: "Update failed", data: null });
      else {
        res
          .status(200)
          .json({ message: "Wallet info updated successfully!", data: walletInfo });
      }
    });
  },
  deleteById: function (req, res, next) {
    tokenModel.findByIdAndRemove(req.params.id, function (err, walletInfo) {
      if (err) res.status(400).json({ message: "Delete failed", data: null });
      else {
        res.status(200).json({ message: "Wallet info deleted successfully!", data: null });
      }
    });
  },
};
