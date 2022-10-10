import Message from "../models/Message.js";

//CREATE MESSAGE
export const createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    const savedMessage = await newMessage.save();

    res.status(200).json(savedMessage);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET MESSAGES
export const getMessages = async (req, res) => {
  try {
    const allMessages = await Message.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(allMessages);
  } catch (error) {
    return res.status(500).json(error);
  }
};
