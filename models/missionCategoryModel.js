const { default: mongoose } = require("mongoose");

const missionCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("missioncatgeory", missionCategorySchema);
