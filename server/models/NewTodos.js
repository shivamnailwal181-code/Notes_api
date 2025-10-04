import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    task: { type: String, required: true },
    desc: { type: String, required: true},
    userId :{type:mongoose.Schema.Types.ObjectId, ref:'User'}
})
const todos = mongoose.model('notes',NoteSchema)
export default todos