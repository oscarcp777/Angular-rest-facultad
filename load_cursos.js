var  fs = require('fs')
    , db = require('mongojs').connect('fiuba');

db.collection('departamentos').count( function (erros, doc) {
    if (doc == 0) {
        var cursos = JSON.parse(fs.readFileSync(__dirname+'/app/cursos/cursos.json').toString());
        cursos.forEach(function (curso) { 
            curso.details = JSON.parse(fs.readFileSync(__dirname+'/app/cursos/'+curso.id+'.json').toString());
            curso._id = curso.id;
            delete curso.id;
            db.collection('departamentos').insert(curso, function (err, doc) { 
                if (err) {throw err;}
            });
        });
        console.log('cursos load to MongoDB');
    }
});