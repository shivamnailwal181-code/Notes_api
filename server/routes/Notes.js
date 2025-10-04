import express from 'express'
import todos from '../models/NewTodos.js'
import Middleware from '../middleware/Middleware.js'
const router = express.Router()


router.post("/add", Middleware, async (req, res) => {
    try {
        console.log('hi')
        const { task, desc } = req.body
        const addNotes = new todos({
            task,
            desc,
            userId: req.user.id
        });
        const userToken = req.user
        console.log(userToken)
        console.log(addNotes)
        await addNotes.save()
        return res.status(200).json({ success: true, userToken, message: " Notes saved succesfully" })
    } catch (err) {
        res.status(500)
            .json({ success: false, message: "Error please Login" })
    }
})

router.get("/", Middleware,async (req, res) => {
    try {
        console.log("get oper")
        const notes = await todos.find({userId:req.user.id})
        console.log(notes)
        return res.status(200).json({ success: true, notes })
    } catch (err) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}
)

router.put("/:id", Middleware, async (req, res) => {
    try {
        console.log('put')
        const { task, desc } = req.body;
        const updatedNote = await todos.findOneAndUpdate({ _id: req.params.id}, { task, desc }, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }
        return res.status(200).json({ success: true, message: "Note Saved" });

    }
    catch (err) {
        return res.status(500).json({ success: false , message:err.message });
    }
})

router.delete("/:id",Middleware,async(req,res) => {
    try{
        const deleteNote = await todos.findByIdAndDelete({_id:req.params.id})

        if(!deleteNote) {return res.status(404).json({success:false, message:"Note not found for deletion"})}
        return res.status(200).json({success:true, message:"Note Deleted successfully"})
    }
    catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
})


export default router