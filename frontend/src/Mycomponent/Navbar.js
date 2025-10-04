import React from "react";
import { useAuth } from "./Context/ContextProvider";
import { Link,useNavigate } from "react-router-dom";



export default function Navbar({setQuery}) {
    const { user,login } = useAuth()  
    const navigate = useNavigate()
    const logOut=()=>{
        login(null)
        localStorage.removeItem('username')
        navigate('/login')
    }
    return (
        <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between relative">
            {/* Left - Logo */}
            <div className="text-xl font-bold">NoteApp</div>

            {/* Middle - Search (Centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
                <input
                    type="text"
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder="Search notes..."
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {!user ? (
                <div className="flex items-center space-x-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium">
                        <Link to="/login">Login</Link>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-medium">
                        <Link to="/register">Signup</Link>
                    </button>
                </div>)
                : (<div className="flex items-center space-x-4">


                    <span className="font-medium">Hello, {user.name}</span>
                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-medium" onClick={logOut}>
                        
                        Logout
                    </button>
                </div>
                )}
        </nav>
    );
}
