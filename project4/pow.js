/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.square = (req, res) => {
  let number = req.query.number;
  if( isNaN(number)) {
     res.status(200).send(`Input error, not a number: ${number}`);
     return;
  }
  let sqrNumber = Math.pow(parseInt(number), 2);
  res.status(200).send(`${sqrNumber}`);
};

