import AllCustomer from "./allCustomer";
import "./styles/App.css";
import Homepage from "./homePage";
import Navbar from "./components/navbar";

import { Routes, Route } from "react-router-dom";
import UserDetails from "./userDetails";
import ChoosePage from "./transfer";
import TransferPage from "./transferPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path="/all"
            element={
              <AllCustomer head={"Our Customer List"} topic={"View Det."} />
            }
          ></Route>
          <Route path="/all/:id" element={<UserDetails />}></Route>
          <Route
            path="/choose"
            element={<ChoosePage head={"Choose Customer"} />}
          ></Route>
          <Route path="/choose/:id" element={<TransferPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
