"use client";
import React, { ReactNode } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main> 
      <Footer />
    </>
  );
}
