const router = require("express").Router();
const db = require('../db/db.json')
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


router.get('/api/notes', (req, res) => {
    res.json(db)
})

router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: idNumber(),
        };

        console.log(newNote)

        db.push(newNote);
        fs.writeFile('../db/db.json', JSON.stringify(db), (err) => {
            (err) ? console.log(err) : console.log('success')
        })


        res.status(201).json(newNote);
    } else {
        res.status(500).json('Error in saving your note');
    }
}
)

router.delete('/notes/:id', (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    for (i = 0; i < db.length; i++) {
        if (id === db[i].id) {
            db.splice(i, 1);
            fs.writeFile('../db/db.json', JSON.stringify(db), (err) => {
                (err) ? console.log(err) : console.log("Note deleted")
            })
            res.status(201).json(db);
            return;
        } 
    }
            res.status(500).json('Error in deleting your note');
        
        
    }
        )
        module.exports = router;