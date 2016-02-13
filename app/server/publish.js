// Publish the "chats" collection

// Publish chats that the current user involving user
Meteor.publish("chats", function(){
    return Chats.find({$or: [{user1: Meteor.userId},
			     {user2: Meteor.userId}]});
});

// Publish the "userData" collection
Meteor.publish("userData", function() {
    return Meteor.users.find(
	{},
	{fields: {"profile": 1}}
    );
});
