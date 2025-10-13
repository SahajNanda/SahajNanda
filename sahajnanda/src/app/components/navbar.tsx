import React from 'react';

function Navbar() {
    return (
        <nav className='w-full p-2 text-white flex justify-between items-center bg-emerald-950/75 backdrop-blur-md'>
            <a href="/" className='px-3 py-2 rounded text-emerald-700 hover:animate-pulse transition duration-300 ease-in-out text-xl font-bold'>Sahaj Nanda</a>
            <div>
                <a href="/about" className='px-3 py-2 hover:text-emerald-500 hover:animate-pulse transition duration-1000 ease-in-out'>About</a>
                <a href="/contact" className='px-3 py-2 hover:text-emerald-500 hover:animate-pulse transition duration-1000 ease-in-out'>Contact</a>
            </div>
        </nav>
    );
}

export default Navbar;