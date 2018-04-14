import { Mongo } from "meteor/mongo";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


export const Posts = new Mongo.Collection("posts");

if(Meteor.isServer) {
	Meteor.publish("posts", () => {
		return Posts.find({});
	});
}

Meteor.methods({

  'posts.insert'(city, text, title) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    
 
    Posts.insert({
			city: city, 
			who: Meteor.user(), 
			text,
			title:title, 
			voteCount:0,
			votes:{
				"👍":0
			}
    });
  },
  'posts.remove'(postId) {
    check(postId, String);
 
    Posts.remove(postId);
  },
});

