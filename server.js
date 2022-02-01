const path = require('path'); //importh path module

//take contents of public folder and make it into static assets
app.use(express.static(path.join(__dirname, 'public'))); 