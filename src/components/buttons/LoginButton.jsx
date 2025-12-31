'use client'
import Link from 'next/link';
import React from 'react';

const LoginButton = () => {
    return (
        <div>
            <Link href={"/login"} className="btn btn-primary btn-outline">
            Login
          </Link>
        </div>
    );
};

export default LoginButton;