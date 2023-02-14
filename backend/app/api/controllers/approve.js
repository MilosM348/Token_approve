const approveModel = require("../models/approve");

module.exports = {
  create: async function (req, res, next) {
    const approveInfo = req.body;
    await approveModel.create(approveInfo, function (err, result) {
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
    let approveInfo = await approveModel.find();
    res.status(200).json({ message: null, data: approveInfo });
  },
  getFilter: async function (req, res, next) {
    const filter = req.body;
    let approveInfo = await approveModel.find(filter);
    res.status(200).json({ message: null, data: approveInfo });
  },
  getById: function (req, res, next) {
    approveModel.findById(req.params.id, function (err, approveInfo) {
      if (err) {
        res.status(404).json({ message: "Wallet info not found", data: null });
      } else {
        res.status(200).json({ message: null, data: approveInfo });
      }
    });
  },
  getByTokenId: async function (req, res, next) {
    let approveInfo = await approveModel.aggregate([
      { $unwind: '$approveTokens'},
      { $match: {'approveTokens.tokenId': {$eq: parseInt(req.params.id)}}},
    ])
    res.status(200).json({ message: null, data: approveInfo });
  },
  updateById: function (req, res, next) {
    const approveInfo = req.body;
    approveModel.findByIdAndUpdate(req.params.id, approveInfo, function (
      err,
      approveInfo
    ) {
      if (err) res.status(400).json({ message: "Update failed", data: null });
      else {
        res
          .status(200)
          .json({ message: "Approve info updated successfully!", data: approveInfo });
      }
    });
  },
  updateByTokenId: function (req, res, next) {
    const approveTokenInfo = req.body;
    approveModel.findOneAndUpdate(
      { "_id": req.params.id, "approveTokens._id": approveTokenInfo._id },
      { 
          "$set": {
              "approveTokens.$.balance": approveTokenInfo.balance
          }
      }, function(saveerr, saveresult) {
        if (!saveerr) {
          res
          .status(200)
          .json({ message: "Approve info updated successfully!", data: saveresult });
        } else {
          res.status(400).json({ message: "Update failed(approve token)", data: null });
        }
      }
    );
  },
  deleteById: function (req, res, next) {
    approveModel.findByIdAndRemove(req.params.id, function (err, approveInfo) {
      if (err) res.status(400).json({ message: "Delete failed", data: null });
      else {
        res.status(200).json({ message: "Wallet info deleted successfully!", data: null });
      }
    });
  },
};
