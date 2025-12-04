const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const DeskSchema = require("../Schema/DeskID.Schema");
const UserSchema = require("../Schema/User");
const DB = require("../Connection");

const create = async (req, res, next) => {
  const { number, user } = req.body;
  try {
    await DB.connectWithRetry();
    let fields = { number, user };
    if (!validator.validateField(fields, res)) return null;
    let checkEmployee = await UserSchema.findById(user).populate("deskId");
    if (!checkEmployee) return SendFail(res, "Incorrect user id");
    if (checkEmployee.deskId) {
      return SendSuccess(
        res,
        "User already assigned in Desk ID " + checkEmployee?.number,
        checkEmployee
      );
    }
    // if(checkEmployee)
    const savedData = await DeskSchema.create({
      ...req.body,
      countMemberNumber: 0,
    });
    if (user) {
      await UserSchema.findByIdAndUpdate(
        user,
        {
          deskId: savedData._id,
          deskNumber: number,
        },
        { new: true }
      );
    }

    SendSuccess(res, "Desk Created", savedData);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const addMember = async (req, res, next) => {
  const { deskNumber, user, deskId } = req.body;
  try {
    await DB.connectWithRetry();
    let fields = { deskNumber, user, deskId };

    if (!validator.validateField(fields, res)) return null;
    // let checkEmployee = await UserSchema.findById(user).populate("deskId");
    // if (checkEmployee.deskId) {
    //   return SendSuccess(
    //     res,
    //     "User already assigned in Desk ID " + checkEmployee?.deskNumber,
    //     checkEmployee
    //   );
    // }
    await DeskSchema.findOneAndUpdate(
      { _id: deskId },
      { $inc: { countMemberNumber: 1 } }
    );
    if (user) {
      await UserSchema.findByIdAndUpdate(
        user,
        {
          deskId: deskId,
          deskNumber: deskNumber,
        },
        { new: true }
      );
    }

    return SendSuccess(res, "Desk Created", []);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const removeEmployee = async (req, res, next) => {
  const { deskNumber, user, deskId } = req.body;
  try {
    await DB.connectWithRetry();
    let fields = { deskNumber, user, deskId };

    if (!validator.validateField(fields, res)) return null;

    await DeskSchema.findOneAndUpdate(
      { _id: deskId },
      { $inc: { countMemberNumber: -1 } }
    );
    if (user) {
      await UserSchema.findByIdAndUpdate(
        user,
        {
          deskId: null,
          deskNumber: 0,
        },
        { new: true }
      );
    }

    return SendSuccess(res, "Desk Created", []);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const read = async (req, res, next) => {
  try {
    // Ensure DB connection on serverless cold start; safely returns if already connected
    await DB.connectWithRetry();

    const limit = parseInt(req.query.limit, 10) || 100;
    const page = parseInt(req.query.page, 10) || 1;
    const skip = (page - 1) * limit;

    const data = await DeskSchema.find(req.query)
      .populate("employee")
      .populate("members")
      .sort({ number: 1 })
      .lean()
      .skip(skip)
      .limit(limit);

    SendSuccess(res, "Desk Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
    await DB.connectWithRetry();
    const { id } = req.params;
    const data = await DeskSchema.findByIdAndDelete(id);
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Desk Deleted", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const update = async (req, res, next) => {
  try {
    await DB.connectWithRetry();
    const { id } = req.params;
    const data = await DeskSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Desk Deleted", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
module.exports = {
  read,
  create,
  update,
  Delete,
  removeEmployee,
  addMember,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
