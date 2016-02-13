// Helpers
Template.chatPage.helpers({
    messages: function(){
	var chat = Chats.findOne({_id: Session.get("chatId")});
	return chat.messages;
    },
    otherUser: function(){
	return Session.get("otherUserId");
    }

});

// Events
Template.chatPage.events({
    // This event fires when the user sends a message on the chat page
    'submit .js-send-chat': function(event){
	// Stop the form from triggering a page reload
	event.preventDefault();

	// See if we can find a chat object in the database
	// to which we'll add the message
	var chat = Chats.findOne({_id: Session.get("chatId")});
	if (chat){
	    // Pull the messages property
	    var messages = chat.messages;
	    if (!messages){
		messages = [];
	    }

	    var message = new ChatMessage(Meteor.userId,
					  Session.get("otherUserId"),
					  event.target.chat.value);

	    // Is a good idea to insert data straight from the form
	    // (i.e. the user) into the database?? certainly not.
	    // push adds the message to the end of the array
	    //  messages.push({text: event.target.chat.value});
	    messages.push(message);

	    // reset the form
	    event.target.chat.value = "";

	    // put the messages array onto the chat object
	    chat.messages = messages;

	    // update the chat object in the database.
	    Chats.update(chat._id, chat);
	}
    }
});
