import homeLogo from './assets/icons/homeLogo.svg'
import './styles/navbar.css'
import {Link} from 'react-router-dom'
const Navbar = () => {
    return ( 
        <nav>
            <Link to="/"><img  className="mainLogo" src={homeLogo} alt="home" /></Link>
            <ul className='navLinks'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/all">All Customers</Link></li>
                <li>Contact Us</li>
                <li>About Us</li>
            </ul>
            <a href="#" className='loginBtn'>Login</a>
        </nav>
     );
}
 
export default Navbar;