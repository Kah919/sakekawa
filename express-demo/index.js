const Joi = require('@hapi/joi');
const express = require('express'); // loading express module 
const app = express(); // represents our application

app.use(express.json()); // adding a middleware for our app

// we have access to different methods to the HTTP verb/method
// app.get()
// app.post()
// app.put()
// app.delete

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];


// this is how we define a route
app.get('/', (req, res) => { // takes in a path and a callback function known as route handler
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // return 404 object not found
    if(!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
})

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    const { error} = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course); 
});

const validateCourse = course => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

// PORT
// Type export PORT="THE PORT NUMBER YOU WANT TO BE USING"
// ex;
// export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));