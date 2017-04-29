// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. 
//		This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. 
//		This route will also be used to handle the compatibility logic.

var friendsData = require("../data/friends.js");


module.exports = function(app) {
    app.get("/api/friends", function(req, res) {

        return res.json(friendsData);
    });
    app.post("/api/friends", function(req, res) {
        //setting bestMatch varible 
        var bestMatch = {
            name: "",
            picture: "",
            friendDifference: 100
        };

        //set user varibles
        var userData = req.body;
        var userName = userData.name;
        var userPicture = userData.picture;
        var userScores = userData.scores;
        var totalDifference = 0;
        //loop through friendsData array
        for (var i = 0; i < friendsData.length; i++) {
            // console.log(friendsData[i].name);
            //loop through score 
            for (var j = 0; j < friendsData[i].scores.length; j++) {

                totalDifference += Math.abs(userScores[j] - friendsData[i].scores[j]);
            }
            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friendsData[i].name;
                bestMatch.picture = friendsData[i].picture;
                bestMatch.friendDifference = totalDifference;
                console.log(totalDifference);
                console.log(bestMatch);
                console.log("Your closet match is:" + bestMatch.name +" "+ bestMatch.picture);
            }



        }
        friendsData.push(userData);
        res.json(bestMatch);
        module.exports= bestMatch;

    });
}