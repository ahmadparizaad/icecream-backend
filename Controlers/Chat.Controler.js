const { SendSuccess, SendError, SendFail } = require("../Middlewares/Response");
const { validateField } = require("../Middlewares/Validator");
const ChatSchema = require("../Schema/Chat.Schema");
const DefaultSchema = require("../Schema/Chat.Schema");
const MessageSchema = require("../Schema/Message.Schema");

const Create = async (req, res, next) => {
  try {
    console.log(req.body, "<<<thisisbodydata");
    const { user1, user2, msg, writer } = req.body;
    let chatId=req.body.chatId
    if(!chatId){
    let filter =  {
       $or: [
       { $and: [{ user1: user1 }, { user2: user2 }] },
         { $and: [{ user1: user2 }, { user2: user1 }] },
       ],
     }

    let data=await DefaultSchema.find(filter)
    if(data?.length){
    chatId=data[0]?._id
    }
  }

    if (!chatId) {

      let fields = { user1, user2, msg, writer };
      if (!validateField(fields, res)) return null;
      let message = await MessageSchema.create({
        writer,
        msg,
        createdAt: new Date(),
      });

      const savedData = await DefaultSchema.create({
        ...req.body,
        messages: message._id,
      });
      SendSuccess(res, "Chat Created Sent", savedData);
    } else {
      let fields = { msg, writer };
      if (!validateField(fields, res)) return null;

      let message = await MessageSchema.create({
        writer,
        msg,
        createdAt: new Date(),
      });

     

    
        let saveData = await DefaultSchema.findByIdAndUpdate(
          chatId,
          {
            $push: {
              messages: message._id,
            },
          },
          { new: true }
        );
      SendSuccess(res, "MEssage Sent", saveData);
    }
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const Read = async (req, res, next) => {
  try {
    const data = await DefaultSchema.find(req.query)
      .populate("user1")
      .populate("user2")
      .populate("mainEnquiry")
      .populate("productEnquiry")
      .populate("memberEnquiry")
      .populate("messages");
    SendSuccess(res, " Data Fetched", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const MyChat = async (req, res) => {
  try {
    const { userId,chatId } = req.query;
    if (!userId) return SendFail(res, "userId is required");
    // if (!userId) return SendFail(res, "userId is required");
    let filter = {
      $or: [{ user1: userId }, { user2: userId }],
    };
    if(chatId){

       filter = {...filter,_id:chatId};
    }
    // if (project) {
    //   filter = { ...filter, project };
    // }
    const data = await DefaultSchema.find(filter)
    .sort({updatedAt:-1})
      .populate("user1")
      .populate("user2")
      .populate("mainEnquiry")
      .populate("memberEnquiry")
      .populate("productEnquiry")
      .populate("messages");
    SendSuccess(res, "Chat fetched", data);
  } catch (error) {
    SendError(res, error);
  }
};

const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return SendFail(res, "Id is required", {});
    const data = await DefaultSchema.findByIdAndDelete(id);
    if (!data) return SendFail(res, "Id not found");
    SendSuccess(res, "Object Deleted", data);
  } catch (e) {
    console.log(e);
    SendError(res, e);
  }
};

const Update = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) return SendFail(res, "id is required", []);
    if (!req.body) return SendFail(res, "Body data for update is required", []);
    let data = await DefaultSchema.findByIdAndUpdate(id, req.body);
    SendSuccess(res, "Field Updated", data);
  } catch (error) {
    console.log(error.message);
    SendError(res, error, []);
  }
};
const messageSeen = async (req, res) => {
  try {
    const { chatId, messageIds } = req.body;
    let fields = { chatId, messageIds };
    if (!validateField(fields, res)) return null;
    console.log(req.body);
    const saveData = await MessageSchema.updateMany(
      { _id: { $in: messageIds } },
      { $set: { seen: true } },
      { multi: true }
    );

    // })
    // let data = await DefaultSchema.findAndUpdate(
    //   { "messages._id": { $in: messageIds } },
    //   { $set: { "messages.$.seen": true } },
    //   { multi: true, new: true }
    // );

    // let data = await DefaultSchema.(
    //   {
    //     "messages._id": { $elemMatch: { $in: messageIds } },
    //   },
    //   { $mul: { "messages.$[elem].seen": true } },
    //   { arrayFilters: [{ "elem._id": { $in: messageIds } }], multi: true }
    // );
    SendSuccess(res, "Updated", saveData);
  } catch (error) {
    SendError(res, error);
  }
};
module.exports = {
  Read,
  Create,
  Delete,
  Update,
  messageSeen,
  MyChat,
};

// module.exports = { createUser, userLogin, getUserDetails, updateUserDetails }
