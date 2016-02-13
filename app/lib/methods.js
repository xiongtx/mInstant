/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/

Meteor.methods({
    'lib/method_name': function () {

	if (this.isSimulation) {
	    //   // do some client stuff while waiting for
	    //   // result from server.
	    //   return;
	}
	// server method logic
    },
    'getChatId': function(otherUserId) {
	// Must be logged in to chat
	if (!this.userId) {
	    throw new Meteor.Error("ChatWithoutLoginError",
				   "Cannot chat without logging in");
	}

	// Cannot chat with yourself
	if (otherUserId == this.userId) {
	    throw new Meteor.Error("ChatWithSelfError",
				   "Cannot chat with yourself: " + this.userId);
	}

	// Get Chat object
	var filter = {$or:[
	    {user1: Meteor.userId(), user2: otherUserId},
	    {user2: Meteor.userId(), user1: otherUserId}
	]};
	var chat = Chats.findOne(filter);

	if (chat) {
	    return chat._id;
	}
	else {
	    // No chat matching the filter - need to insert a new one
	    return Chats.insert(new Chat(this.userId, otherUserId));
	}
    }
});
