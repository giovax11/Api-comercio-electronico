/**
 * Error handler middleware
 *
 * Catches and handles errors that occur during the request-response cycle
 *
 * @param {object} err - Error object
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next middleware function
 */

export const ErrorHandler = (err, req, res, next) => {
  //Set the error status code and message
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  //Send error to client
  res.status(errStatus).json({
    status: errStatus,
    message: errMsg,
  });
};
