const fs = require("fs").promises;
const path = require("path");

const csv=require('csvtojson');
const fg = require('fast-glob');

main();

async function main() {
  const files = await fg(['_datacache/*.csv']);
  const results = [];

  for (const csvFile of files) {
    const [mm, dd, yyyy] = path.basename(csvFile, ".csv").split("-", 3);
    const date = `${yyyy}-${mm}-${dd}`;
    const data = await csv().fromFile(csvFile);
    const canada = data.filter(res => res['Country/Region'] === 'Canada').map(item => {
      item.Confirmed = Number(item.Confirmed) || 0;
      item.Deaths = Number(item.Deaths) || 0;
      item.Recovered = Number(item.Recovered) || 0;
      return item;
    });
    const dailyStats = canada.reduce((acc={}, item) => {
      acc.Confirmed += item.Confirmed;
      acc.Deaths += item.Deaths;
      acc.Recovered += item.Recovered;
      return acc;
    }, {Confirmed:0, Deaths:0, Recovered:0});

    const obj = {date, stats: dailyStats, data: canada};
    if (canada.length !== 0) {
      results.push(obj);
      await fs.writeFile(path.join("./src/pages", `${date}.11tydata.json`), JSON.stringify(obj, null, 2));
      await fs.writeFile(path.join("./src/pages", `${date}.liquid`), `---\ntitle: ${date }\n---\n`);
    }
  }

  // console.log(JSON.stringify(results, null, 2));
  await fs.writeFile("src/_data/stats.json", JSON.stringify(results, null, 2));
}
