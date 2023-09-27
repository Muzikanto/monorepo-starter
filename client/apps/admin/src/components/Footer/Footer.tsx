import React from 'react';
import { FooterProps } from './Footer.types';

const Footer: React.FC<FooterProps> = ({ children }) => {
  return <footer>{children}</footer>;
};

export default Footer;
