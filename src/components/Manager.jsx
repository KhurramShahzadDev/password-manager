import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Manager() {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast('🦄 copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        if (ref.current.src.includes("icons/eye.jfif")) {
            ref.current.src = "icons/closed_eye.jfif";
            passwordRef.current.type = "password";
        } else {
            ref.current.src = "icons/eye.jfif";
            passwordRef.current.type = "text";
        }
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedPasswordArray = [...passwordArray, newPassword];
            
            // Update state and local storage
            setPasswordArray(updatedPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
            
            // Reset form
            setForm({ site: "", username: "", password: "" });

            toast('🦄 Password saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast('🦄 Error! Password not saved!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    
    const deletePassword = (id) => {
        console.log("Deleting password with id", id);
        let c = confirm("Do you really want to delete the password?");
        if (c) {
            const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
            
            toast('🦄 Password Deleted Successfully!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const editPassword = (id) => {
        console.log("Editing password with id", id);
        const passwordToEdit = passwordArray.find(i => i.id === id);
        setForm(passwordToEdit);
        const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
        setPasswordArray(updatedPasswordArray);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="p-2 md:p-0 md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-700'> &lt;</span>
                    Pass
                    <span className='text-green-400'>Op/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Password Manager</p>

                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter Website URL'
                        className='rounded-full border border-green-500 w-full p-4 py-1'
                        type="text"
                        name='site'
                        id='site'
                    />
                    <div className="flex flex-col md:flex-row w-full gap-8 justify-between ">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter the user name'
                            className='rounded-full border border-green-500 w-full p-4 py-1'
                            type="text"
                            name='username'
                            id='username'
                        />
                        <div className="relative">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder='Enter password '
                                className='rounded-full border border-green-500 w-full p-4 py-1'
                                type="password"
                                name='password'
                                id='password'
                            />
                            <span className='absolute right-0 top-0 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-2' width={35} src="icons/eye.jfif" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center text-black items-center gap-2 bg-green-400 hover:bg-green-200 rounded-full px-6 py-2 w-fit border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No password to show</div>}
                    {passwordArray.length > 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden  mb-10">
                            <thead className=' bg-green-800 text-white  '>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='flex items-center justify-center py-2 border border-white text-center'>
                                                <a href={item.site} target='_blank' rel='noopener noreferrer'> {item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center'>
                                                <div className='flex justify-center items-center'>
                                                    <span>{item.username}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                            trigger="hover"
                                                        >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='justify-center py-2 border border-white text-center'>
                                                <div className='flex justify-center items-center'>
                                                    <span>{item.password}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                            trigger="hover"
                                                        >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='justify-center py-2 border border-white text-center'>
                                                <div className='flex justify-center items-center'>
                                                    <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/rsbokaso.json"
                                                            trigger="hover"
                                                        >
                                                        </lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                        >
                                                        </lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
}
