const express = require("express")
//const helper = require("./static/helper.js")

const app = express()


app.use(express.static("./static/"))
app.use(express.urlencoded({extended : false}))



app.post("/unscramble", (req, res) => {

    const word = req.body["scrambled"]
    console.log(word);
    
    res.json(unscramble(word))



})


app.listen(8000, () => console.log("Server running at port 8000"))
