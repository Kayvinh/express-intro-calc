const { BadRequestError } = require("./expressError");


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


module.exports = { convertStrNums };