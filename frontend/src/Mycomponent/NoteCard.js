
import React from "react";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";




const NoteCard = ({ note, isEdit, CatchisDel,isdel,Fetchnotes}) => {

    const handleDelete = async () => {

        try{
        const response = await axios.delete(`http://localhost:5000/api/notes/${note._id}`,
         {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
    );
      if (response.data.success) {
        Fetchnotes(); 
      }
    } catch (err) {
      console.log(err);
    }
    }




    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{note.task}</h2>
            <p>{note.desc}</p>
            <div className="flex justify-end mt-2">
                <button className="text-blue-500 mr-2"
                    onClick={() => isEdit(note)}>
                    <Edit />
                </button>
                <button className="text-red-500"
                    onClick={handleDelete}
                >
                    <Trash2 />
                </button>
            </div>
        </div>
    );
};
export default NoteCard

