// Set up the main template the the router will use to build pages
Router.configure({
    layoutTemplate: 'appLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});


// Specify the top level route, the page users see when they arrive at the site
Router.route('/', function () {
    this.render("navbar", {to: "header"});
    this.render("lobbyPage", {to: "main"});
});

// Specify a route that allows the current user to chat to another users
Router.route('/chat/:_id', function () {
    var otherUserId = this.params._id;

    // Set other user ID as session variable
    Session.set("otherUserId", otherUserId);

    // Get chat object
    Meteor.call("getChatId", otherUserId, function(error, result){
	if (error){
	    console.log(error);
	}
	else{
	    // var chatId = result;
	    Session.set("chatId", result);
	}
    });

    // console.log("Chat ID: " + chatId);

    // if (chatId){
    //	// Looking good, save the ID to the session
    //	Session.set("chat", chatId);
    // }

    this.render("navbar", {to:"header"});
    this.render("chatPage", {to:"main"});
});
