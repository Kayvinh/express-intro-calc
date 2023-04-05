const { BadRequestError } = require("./expressError");
const fsP = require('fs/promises');


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  return strNums.map(numberItem => {

    if (isNaN(Number(numberItem))) {
      throw new BadRequestError(`${numberItem} is not a number`);
    }

    return Number(numberItem);
  });

}

async function saveResponse (statsResult) {
  try {
    await fsP.writeFile("./results.json", JSON.stringify(statsResult), "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Successfully wrote to file");
}


module.exports = { 
  convertStrNums,
  saveResponse };