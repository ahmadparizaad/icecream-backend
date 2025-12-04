const SendError = (res, e) => {
  res.status(400).send({ success: false, error: e.message });
};
const SendFail = (res, msg, data = {}) =>
  res.status(400).send({ success: false, message: msg, data });
const SendSuccess = (res, message, data) => {
  res.status(200).send({ success: true, message: message, data });
};

module.exports = { SendError, SendSuccess, SendFail };
