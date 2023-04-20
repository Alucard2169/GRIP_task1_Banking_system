import "./styles/transferPage.css";
import useFetch from "./hooks/usefetch";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TransferPage = () => {
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("GET");
  const history = useNavigate();
  const { id } = useParams();

  const [url, setUrl] = useState(`/api/all/${id}`);

  const transferMoney = (e) => {
    e.preventDefault();
    const senderId = localStorage.getItem("senderId");
    const receId = id;
    setMethod("PUT");
    setUrl(`/api/choose/${senderId}/${receId}/${amount}`);
  };

  const { data, error, isLoading } = useFetch(url, method);

  useEffect(() => {
    if (data === null) {
      return;
    } else if (data.status === "Successful") {
      alert("Transfer Successful");
      history("/all");
    }
  }, [transferMoney]);

  return (
    <>
      {error && <div style={{ color: "white" }}>{error}</div>}
      {isLoading && <div style={{ color: "white" }}>Loading...</div>}
      {data && (
        <div className="detailAbout">
          <p>
            Customer Name: <span>{data.customerName}</span>
          </p>
          <div className="card">
            <form onSubmit={transferMoney}>
              <label htmlFor="amount">Amount (in INR):</label>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                id="amount"
                name="amount"
                min={1}
                required
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TransferPage;
