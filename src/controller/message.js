const {ChatMessage, Chat} = require('../mongo/index');
//GET ALL BY CHAT
exports.index = (req, res) => {
	ChatMessage.find({chat: req.params.chatId}).populate('user').then(chats => {
		res.status(200).json(chats);
	}).catch(e => {
		res.status(500).json({error: e.message});
	});
};

//CREATE ONE BY CHAT
exports.createOne = async (req, res) => {
	try {
		const chat = await Chat.findById(req.params.chatId);
		if(chat){
			if(req.body.body){
				const message = new ChatMessage({user: req.user.id, chat: req.params.chatId, body: req.body.body});
				message.save().then(newMessage => {
						res.status(201).json(newMessage);
					}).catch(e =>  {
					res.status(500).json({error: e.message})
				});
			}
		}else{
			res.status(500).json({error: "wrong chat ID"});
		}
	}catch (e) {
		res.status(500).json({error: e.message});
	}
}
