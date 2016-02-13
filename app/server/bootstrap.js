// Startup
Meteor.startup(function () {
    if (!Meteor.users.findOne()){
	for (var i=1; i<9; i++){
	    var email = "user" + i + "@test.com";
	    var username = "user" + i;
	    var avatar = "ava" + i + ".png";

	    // Add user
	    console.log("creating a user with password 'test123' and username/ email: "+email);
	    Meteor.users.insert({emails: [{address: email}],
				 profile: {username: username,
					   avatar: avatar},
				 services: {password: {"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
	}
    }
});
