import { Link } from 'react-router-dom';
import '../scss/_reset.scss'
import '../scss/Footer.scss'
import fbIcon from '/images/icon-fb.svg';
import igIcon from '/images/icon-ig.svg';
import lineIcon from '/images/icon-line.svg';
import fbIconHover from '/images/icon-fb-hover.svg';
import igIconHover from '/images/icon-ig-hover.svg';
import lineIconHover from '/images/icon-line-hover.svg';

const Footer = () => {
  return (
    <footer>
      <div className='footerMain'>
        <div className="footer-spacer" />
        <small>Copyright &copy; sJAVing</small>
        <div className="footer-right">
          <ul className="social">
            <li><a href="#" aria-label="Instagram">
              <img className='icon normal' src={igIcon} alt="Instagram" />
              <img className='icon hover' src={igIconHover} alt="Instagram hover" />
            </a></li>
            <li><a href="#" aria-label="Facebook">
              <img className='icon normal' src={fbIcon} alt="Facebook" />
              <img className='icon hover' src={fbIconHover} alt="Facebook hover" />
            </a></li>
            <li><a href="#" aria-label="LINE">
              <img className='icon normal' src={lineIcon} alt="Line" />
              <img className='icon hover' src={lineIconHover} alt="Line hover" />
            </a></li>
          </ul>
          <button className="to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="回到最上面">
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer