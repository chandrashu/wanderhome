const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

// Normalize CommonJS/ESM interop for newer Node versions.
const plugin =
  typeof passportLocalMongoose === "function"
    ? passportLocalMongoose
    : passportLocalMongoose.default;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

UserSchema.plugin(plugin);

module.exports = mongoose.model("User", UserSchema);
