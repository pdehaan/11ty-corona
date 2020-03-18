const inspect = require("util").inspect;

const del = require("del");
const _get = require("lodash.get");

del.sync("www");

module.exports = function (eleventyConfig) {
  eleventyConfig.setQuietMode(true);

  eleventyConfig.addFilter("map", (arr, key) => arr.map(item => _get(item, key)));
  eleventyConfig.addFilter("localeDateString", dateObj => new Date(dateObj).toLocaleDateString());
  eleventyConfig.addFilter("toFixed", (value, precision=2) => Number(value).toFixed(precision));
  eleventyConfig.addFilter("localeNumberString", num => Number(num).toLocaleString());

  eleventyConfig.addLiquidFilter("dump", value => inspect(value));

  return {
    dir: {
      input: "src",
      output: "www"
    }
  };
};
