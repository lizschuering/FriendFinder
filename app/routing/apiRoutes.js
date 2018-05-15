//Utilizing the data from the friends.js file
var friends = require('../data/friends');

module.exports = function (app) {
    //Route that displays all the data stored in the friends array
    app.get('/api/friends', function(request, response) {
        response.json(friends);
    });

    //Route that pushes the current user's information into the friends array, runs the matching logic and displays it to the user on the survey.html page
    app.post('/api/friends', function(request, response) {
        //Push the current users' information into the friends array
        friends.push(request.body);
        console.log(friends);
        
        //Grab the current user's questionnaire answers so we can compare it to the other users stored in the friends array
        var currentUserScores = request.body.scores;
        console.log("Here's the current users's question scores: ", currentUserScores);
        
       //Cretae an empty array that will hold the total score differential after we compare the current user's to each existing users' scores
        var scoresDiffArray = []; 

        //Loop through the entire friends array (except for the current user) and compare the current user's score with all of the other users to find the (absolute) total difference for each question.
        for (i=0; i<friends.length-1; i++){
            var scoreDiff = 0;
            
            for (j=0; j<currentUserScores.length; j++){
              scoreDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(currentUserScores[j])));
            }

            //Add the total score differential to scoresDiffArray
            scoresDiffArray.push(scoreDiff);
        }

        //Use the score differentials in scoresDiffArray to find the index number of the best (ie. closest) match in the friends array
        var bestMatch = 0;
        
        for(i=0; i<scoresDiffArray.length; i++){
            if (scoresDiffArray[i] <= scoresDiffArray[bestMatch]){
                bestMatch = i;
            }
        }

        //Return the entire object for the best match from the friends array
        var bestMatchData = friends[bestMatch];
        response.json(bestMatchData);

        console.log("Here is scoresDiffArray: ", scoresDiffArray);
        console.log("Here is best match index number: ", bestMatch);
        console.log("Here is the object for the best match: ", bestMatchData); 
    });

}