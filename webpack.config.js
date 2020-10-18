const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/filter.js",
    "./js/gallery.js",
    "./js/picture.js",
    "./js/validation.js",
    "./js/range.js",
    "./js/preview.js",
    "./js/upload.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
