const validator = require("../Middlewares/Validator");
const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const DeskSchema = require("../Schema/DeskID.Schema");
const UserSchema = require("../Schema/User");

const create = async (req, res, next) => {
  const { number, user } = req.body;
  try {
    let fields = { number, user };
    if (!validator.validateField(fields, res)) return null;
    let checkEmployee = await UserSchema.findById(user).populate("deskId");
    if (!checkEmployee) return SendFail(res, "Incorrect user id");
    if (checkEmployee.deskId) {
      return SendSuccess(
        res,
        "User already assigned in Desk ID " + checkEmployee?.number,
        checkEmployee``
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
    const data = await DeskSchema.find(req.query)
      .populate("employee")
      .sort({ number: 1 })
      .populate("members");

    SendSuccess(res, "Desk Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};
const Delete = async (req, res, next) => {
  try {
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
