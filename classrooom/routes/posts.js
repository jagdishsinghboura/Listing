const express = require("express")
const router = express.Router()

router.get("/", (req, res)=>[
    res.send("get for post ")
])
router.get("/:id", (req, res)=>[
    res.send("get for show post  ")
])

router.post("/", (req, res)=>{
    res.send("posts for post requrest")
})

router.delete("/:id", (req, res)=>{
    res.send("posts for DELETe requrest")
})

module.exports = router