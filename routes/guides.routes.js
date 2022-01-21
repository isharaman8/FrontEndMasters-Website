const express = require("express");

const router = express.Router();
const Guides = require("../models/guides.model");

const upload = require("../middlewares/uploads");


router.post("/", upload.single("poster"), async(req, res)=>{
    try {
        const guide = await Guides.create({
            img_url : req.file.path,
            git_link : req.body.git_link
        });
        return res.status(201).send(guide);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

router.get("/", async(req, res)=>{
    try {
        const guide = await Guides.find().lean().exec();
        return res.status(200).send(guide);
        
    } catch (err) {
        return res.status(400).send(err.message);
    }
})
router.patch("/:id", async(req, res)=>{
    try {
        const guide = await Guides.findByIdAndUpdate(req.params.id, req.body).lean().exec();
        return res.status(200).send(guide);
        
    } catch (err) {
        return res.status(400).send(err.message);
    }
})
router.delete("/", async(req, res)=>{
    try {
        const guide = await Guides.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(guide);
        
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

module.exports = router;