
import "./styles/customerList.css";
import useFetch from './usefetch';
import UserCard from './userCard';
import { motion } from 'framer-motion';

const AllCustomer = (props) => {
    const { head,topic,action} = props;
    const { data: customers,error,isLoading} = useFetch('/api')
    console.log(customers)
    return ( 
        <div className="customList">
            <motion.h1 className="customHead"
               whileHover={{scale: 1.1,rotate: "15deg"}}
                transition={{ ease: "easeOut", duration: 1 }}>{head}</motion.h1>
            <div className="customers">
                {error && <div style={{color: "white"}}>{error}</div>}
                {isLoading && <div style={{color: "white"}}>Loading...</div>}
                {customers && <UserCard customers={customers} action={action} work={topic}/>}
                
            </div>
        </div>
     );
}
 
export default AllCustomer;