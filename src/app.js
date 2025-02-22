const express = require('express');
const Student = require('./models/Student');


const app = express();

// middleware 
app.use(express.json());

// Routes

// Get all the students
app.get('/students', async (req, res) => {
    Student.find({}).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

// Add student to database
app.post('/students', async (req, res) => {
    Student.create({
        isDeleted: false,
        name: req.body.name,
        sex: req.body.sex,
        class: req.body.class,
        age: req.body.age,
        grade_point: req.body.grade_point
    }).then((data) => {
        res.status(200).json({ data })
    }).catch((err) => {
        res.status(400).send(err)
    })
})

// Get specific student
app.get('/students/:id', async (req, res) => {
    Student.findById(req.params.id).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

// delete specific student
app.delete('/students/:id', async (req, res) => {
    if (req.query.type == "soft") {
        Student.findById(req.params.id).then((details) => {
            if (details == null) {
                res.status(400).send("user details not found")
            } else {
                if (details.isDeleted == false) {
                    Student.findByIdAndUpdate(req.params.id, { isDeleted: true }, (err) => {
                        if (err) {
                            res.status(500).send("something went wrong")
                        }
                    }).then((data) => {
                        res.status(200).send(`${data.name} is soft deleted`)
                    })
                } else {
                    res.status(403).send("no longer exist/record not found")
                }
            }

        })
    } else {
        Student.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) {
                res.status(500).send("something went wrong")
            } else {
                if (data === null) {
                    res.status(403).send("no user exits")
                } else {
                    res.status(200).send(`${data.name} is hard deleted`)
                }

            }
        })
    }
})


module.exports = app;
