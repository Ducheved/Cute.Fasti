import { Component } from 'solid-js';
import { FaBrandsSquareGithub } from 'solid-icons/fa';

const Footer: Component = () => {
  return (
    <footer class="nyaFooter">
      <a href="https://github.com/Ducheved/Cute.Fasti" target="_blank" rel="noopener noreferrer" class="nyaGitHubLink">
        <FaBrandsSquareGithub size={48} />
        <span>GitHub</span>
      </a>
    </footer>
  );
};

export default Footer;
