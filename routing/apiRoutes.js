// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. 
//		This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. 
//		This route will also be used to handle the compatibility logic.

var friendsData = require("../app/data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {

        return res.json(friendsData);
    });
    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            picture: "",
            friendDifference: 100
        };
        var userData = req.body;
        var userName = userData.name;
        var userPicture = userData.picture;
        var userScores = userData.scores;
        var totalDifference = 0;

        for (var i = 0; i < friendsData.length; i++) {
            //console.log(friendsData[i].name);
            totalDifference = 0;

            for (var j = 0; j < friendsData[i].scores[j]; j++) {

                totalDifference += Math.abs(userScores[j] -friendsData[i].scores[j]);

                if (totalDifference <= bestMatch.friendsDifference) {
                    bestMatch.name = friendsData[i].name;
                    bestMatch.pictures = friendsData[i].picture;
                    bestMatch.friendDifference = totalDifference;
                //console.log(totalDifference);
                    console.log(bestMatch);

                }
            }
        }
        friendsData.push(userData);
        res.json(bestMatch);

    });
}