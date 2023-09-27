import React from 'react';
import { LayoutProps } from './Layout.types';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main id='layout'>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
