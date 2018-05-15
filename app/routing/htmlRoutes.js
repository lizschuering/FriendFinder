var path = require('path');

module.exports = function (app) {

    //Route to display the survey page
    app.get('/survey', function(request, response) {
        response.sendFile(path.join(__dirname, '../public/survey.html'));
    });

    //Route to display the home page
    app.use('/', function(request, response) {
        response.sendFile(path.join(__dirname, '../public/home.html'));
    });
    
}