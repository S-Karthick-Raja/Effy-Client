import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const HomeLayout = (): React.ReactElement => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-Body">
            <Navbar />
            <div className=" h-full mx-auto max-w-7xl flex flex-col gap-4 justify-center items-center pt-4">
                <Outlet />
            </div>
        </div>
    );
};

export default HomeLayout;
