Template.availableUsers.helpers({
    // Exclude current logged-in user (yourself)
    users: function(){
	return Meteor.users.find({_id: {$ne: Meteor.userId()}});
    }
});
