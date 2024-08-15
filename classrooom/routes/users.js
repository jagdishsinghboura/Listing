const express = require("express")
const router = express.Router()

router.get("/", (req, res)=>[
    res.send("get for user ")
])
router.get("/:id", (req, res)=>[
    res.send("get for show user  ")
])

router.post("/", (req, res)=>{
    res.send("user for post requrest")
})

router.delete("/:id", (req, res)=>{
    res.send("user for DELETe requrest")
})

module.exports = router;