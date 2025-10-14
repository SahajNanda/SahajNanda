import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

function Outline({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-sans text-white bg-emerald-950 bg-[url('/black-thread-light.png')] bg-repeat  bg-fixed">
            <div className="fixed top-0 left-0 inset-x-0 z-50">
                <Navbar />
            </div>
            <div className="flex-1 overflow-y-auto pt-[var(--navbar-height,4rem)] flex flex-col h-screen">
                <main className="p-4 flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Outline;