import arrow from './assets/icons/arrow.svg';
import './styles/usercard.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserCard = (props) => {
    const { customers, work } = props
    
    
    return ( 
        <>  <div className="user header">
            <span className="serial headerHead">sr. no</span>
            <p className="name headerHead">Name</p>
            <span className="branchCode headerHead">Brand Code</span>
            <span className="viewAll headerHead">{work}</span>
        </div>
             {customers.map((customer) => (
                       <div className="user" key={customer._id}>
                     <span className="serial">{customer.serialno}</span>
                            <p className="name">{customer.customerName}</p>
                            <span className="branchCode">{customer.branchCode}</span>
                     {work === "View Det." ? 
                     <Link to={`/all/${customer._id}`}><motion.img src={arrow} alt="view Details" whileHover={{ scale: 1.1, rotate: "360deg" }}
                             transition={{ duration: .5, ease: "easeInOut" }} /></Link>
                         :
                        <Link to={`/choose/${customer._id}`}><motion.img src={arrow} alt="view Details" whileHover={{ scale: 1.1, rotate: "360deg" }}
                         transition={{ duration:.5,ease: "easeInOut"}} /></Link>}
                        </div>
                    ))
                }
        </>
     );
}
 
export default UserCard;