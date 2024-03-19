import { Component } from 'solid-js';
import { BiSolidCat } from 'solid-icons/bi';
import { SiCurl } from 'solid-icons/si';

const Header: Component = () => {
  return (
    <header class="nyaLable nyaLogo">
      <BiSolidCat />
      <h1>Cute.Fasti</h1>
      <SiCurl />
      <h1>Shortener</h1>
    </header>
  );
};

export default Header;
