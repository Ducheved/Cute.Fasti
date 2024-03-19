import { Component } from 'solid-js';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';

const App: Component = () => {
  return (
    <div class="surface-sample">
      <div class="surface-3 card rad-shadow">
        <Header />
        <Form />
      </div>
      <Footer />
    </div>
  );
};

export default App;
