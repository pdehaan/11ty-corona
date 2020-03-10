const del = require("del");

del.sync("www");

module.exports = function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);

  eleventyConfig.addFilter("localeDateString", dateObj => new Date(dateObj).toLocaleDateString());

  // console.log(eleventyConfig);

  return {
    dir: {
      input: "src",
      output: "www"
    }
  };
};
