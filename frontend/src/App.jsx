import './styles/App.scss';
import Games from './games';

function App() {
  return (
    <>
      <header>
        <a href="/index.html" className="logo">
          <img className="logo" src="8bit.png" alt="logo8bit" />
        </a>
        <nav className="navigation">
          <ul>
            <li>
              <a href="/library">Library</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="background-image">
        <img src="public/Main_hell.png" alt="backgroundinvader" />
      </div>
      <main>
        <div className="container">
          <Games />
        </div>
      </main>
      <footer>
        <div className="icons">
          <a href="https://instagram.com" target="_blank">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://youtube.com" target="_blank">
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a href="https://linkedin.com" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <div className="imprint">
          <a href="imprint.html">Impressum</a>
        </div>
        <div className="copyright">
          <p>©8Bit - Beyond - designed by Phil & Benni - since 2023</p>
        </div>
      </footer>
    </>
  );
}

export default App;
