import { useState } from "react";
import AllCustomer from "./allCustomer";
import "./styles/transfer.css"



const ChoosePage = (props) => {
    const { head,action } = props;

    return ( 
        <div className="page">
            <AllCustomer head={head} topic={"transfer"} action={action} />
        </div>
     );
}
 
export default ChoosePage;