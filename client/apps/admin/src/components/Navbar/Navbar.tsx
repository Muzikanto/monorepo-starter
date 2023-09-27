import React from 'react';
import { NavbarProps } from './Navbar.types';

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return <header>{children}</header>;
};

export default Navbar;
