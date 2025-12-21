import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-[1200px] mx-auto'>
            
                <Outlet></Outlet>
          
        </div>
    );
};

export default AuthLayout;