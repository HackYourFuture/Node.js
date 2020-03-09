var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

subjects = ["shark", "popcorn", "poison", "fork", "cherry", "toothbrush", "cannon"];

punchlines = ["watch movie with", "spread some love", "put on cake", "clean toilets", "go to the moon", "achieve world piece", "help people learn programing"];

let lenSubjects = subjects.length;
let lenPunchlines = punchlines.length;

app.get('/', function(req, res) {

    let randSubjects = Math.floor(Math.random() * lenSubjects);
    let randPunchlines = Math.floor(Math.random() * lenPunchlines);
    res.render('home', { subject: subjects[randSubjects], punchline: punchlines[randPunchlines] });

});

app.listen(3000, () => console.log(`listen at port....`));