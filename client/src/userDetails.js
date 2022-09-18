import useFetch from "./usefetch";
import { useParams,Link } from "react-router-dom";
import "./styles/userDetails.css";


const UserDetails = () => {

    const { id } = useParams()
    
    const { data: customer, error, isLoading } = useFetch('/api/all/' + id, "GET");
    const setID = () => {
        localStorage.setItem("senderId", id)
        localStorage.setItem("senderAmount", customer.currentBalance)
    }

    return ( 
        <>
            {error && <div style={{color: "white"}}>{error}</div>}
            {isLoading && <div style={{color: "white"}}>Loading...</div>}
            {customer && <div className="details"  key={customer._id}>
                <div className="info">
                    <p className="name">Customer Name: </p><span className="data">{customer.customerName}</span>
                    <p className="branchCode">Branch Code:</p><span className="data">{customer.branchCode}</span>
                    <p className="customerAccount">Customer Account: </p><span className="data">{customer.customerAccount}</span>
                    <p className="currency">Account Currency: </p><span className="data">{customer.accountCurrency}</span>
                    <p className="currBal">Current Balance: </p><span className="data">{customer.currentBalance}</span>
                    <p className="transferMone">Transferred Money:</p><span className="data">{customer.transferdMoney}</span>
                </div>
                <Link to="/choose"><button className="transfer" onClick={setID}>Transfer Money</button></Link>
        </div>}
        </>
     );
}
 
export default UserDetails;