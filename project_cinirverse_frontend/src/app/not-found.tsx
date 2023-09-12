'use client'
import React from 'react'
import Navbar from './Header_Navbar'
import Footer from './Footer'
type Props = {}

export default function pageNotFound({}: Props) {
  return (
    <div>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex-col">
              <p className="text-black mb-40 text-4xl">Page not found 404</p>
            </div>
          </div>
    </div>

  );
};