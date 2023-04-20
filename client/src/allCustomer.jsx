import "./styles/customerList.css";
import useFetch from "./hooks/usefetch";
import UserCard from "./components/userCard";
import { motion } from "framer-motion";
import Loading from "./components/Loading";

const AllCustomer = (props) => {
  const { head, topic, action } = props;
  const { data: customers, error, isLoading } = useFetch("/api");

  return (
    <div className="customList">
      <motion.h1
        className="customHead"
        whileHover={{ scale: 1.1 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        {head}
      </motion.h1>
      <div className="customers">
        {error && <div style={{ color: "white" }}>{error}</div>}
        {isLoading && <Loading />}
        {customers && (
          <UserCard customers={customers} action={action} work={topic} />
        )}
      </div>
    </div>
  );
};

export default AllCustomer;
