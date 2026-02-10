import React from 'react';
import Link from 'next/link';

function Navbar() {
    return (
        <nav className='w-full p-2 text-white flex justify-between items-center bg-emerald-950/60 backdrop-blur'>
            <Link href="/" className='emerald-500-pulse text-xl font-bold px-3 py-2 cursor-pointer'>sahaj</Link>
            <div>
                <Link href="/cv" className='white-pulse px-3 py-2 cursor-pointer'>CV</Link>
                <Link href="/contact" className='white-pulse px-3 py-2 cursor-pointer'>Contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;