// if(Meteor.isClient){
//     Template.leaderboard.player = function() {
//       return "Some other text"
//     }
// }

// if(Meteor.isServer){
//     console.log("Hello server");
// }

PlayersList = new Mongo.Collection('users');

if(Meteor.isClient){
    Template.leaderboard.helpers({
      'player': function() {
          return PlayersList.find({}, {sort: {score: -1, name:1}})
      },
       'selectedClass': function(){
          var playerId = this._id;
          var selectedPlayer = Session.get('selectedPlayer');
          if (playerId == selectedPlayer) {
             return "selected"
          }
       },
       'showSelectedPlayer': function() {
          var selectedPlayer = Session.get('selectedPlayer');
          return PlayersList.findOne(selectedPlayer)
      }
    });
    Template.leaderboard.events({
      'click .player': function() {
          var playerId = this._id;
          Session.set('selectedPlayer',playerId);
      },
      'click .increment': function() {
          var selectedPlayer = Session.get('selectedPlayer');
          console.log(selectedPlayer);
          PlayersList.update(selectedPlayer, {$inc: {score: 5} });
      },
       'click .decrement': function() {
          var selectedPlayer = Session.get('selectedPlayer');
          console.log(selectedPlayer);
          PlayersList.update(selectedPlayer, {$inc: {score: -5} });
      },
       'click .remove': function() {
          var selectedPlayer = Session.get('selectedPlayer');
          console.log(selectedPlayer);
          PlayersList.remove(selectedPlayer);
      }
    });
    Template.addPlayerForm.events({
      'submit form': function(event) {
          event.preventDefault();
          playerNameVar = event.target.playerName.value;
          // console.log("Form submitted");
          // console.log(event.type);
          // console.log(playerNameVar);
          PlayersList.insert({
              name: playerNameVar,
              score: 0
          });
      }
    });

}