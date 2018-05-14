var friends = require('../data/friends');

module.exports = function (app) {
    app.get('/api/friends', function(request, response) {
        response.json(friends);
    });

    app.post('/api/friends', function(request, response) {
        friends.push(request.body);
        console.log(friends);
        
        //Grabbing the current user's information so we can compare it to the other users
        var currentUserScores = request.body.scores;
        console.log("Here's the current users's scores: ", currentUserScores);
        
        //Defining variables to hold information for score difference comparisons
        var scoresDiffArray = [];
        var bestMatch = 0; //the perfect match for any pair is a total score of 0 (ie. no differences between the two users)

        //Loop through the friends array and compare the current user's score with all of the other users to find the (absolute) total difference
        for(i=0; i<friends.length; i++){
            var scoreDiff = 0;
            for(var j=0; j<currentUserScores.length; j++){
              scoreDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(currentUserScores[j])));
            }
            //Add total score differential to scoresArray
            scoresDiffArray.push(scoreDiff);
        }

        //Use the score differentials in scoresArray to find the index number for the best match in the friends array but exclude the current user from that calculation
        for(i=0; i<scoresDiffArray.length-1; i++){
            if(scoresDiffArray[i] <= scoresDiffArray[bestMatch]){
                bestMatch = i;
            }
        }

        //Return the entire object for the best match from the friends array
        var bestMatchData = friends[bestMatch];
        response.json(bestMatchData);

        console.log("Here is scoresArray: ", scoresDiffArray);
        console.log("Here is best match index number: ", bestMatch);
        console.log("Here is the object for the best match: ", bestMatchData);
        
        //Convering the current user's scores from string values to numbers so we can run the compatibility calculations
        // var currentUserScores = currentUser.scores.map(function (x) { 
        //     return parseInt(x, 10); 
        // });
        //console.log("Here's the current users's scores as integers: ", currentUserScores);

        //Compare current user's scores to every other user's scores
            // Look at each element in each user's array, subtract one number from the other (and always convert negative numbers to positive numbers) and then create a new array 
    });

}