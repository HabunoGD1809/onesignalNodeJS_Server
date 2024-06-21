const express = require("express");
const app = express();
app.get('/', async (req, res) => {
    res.status(200).send({
      message: "¡Hola desde el lado RESTful de Node.js!",
    });
  });

app.use(express.json());
app.use('/api',require('./routes/app.routes'));


// app.listen(process.env.port || 3000, function() {        
    app.listen(3000, function() {        
    console.log("¡El servidor está listo para funcionar!");
});
