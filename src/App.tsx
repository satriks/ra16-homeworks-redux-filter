import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AddForm from "./components/AddForm";
import FIlter from "./components/FIlter";
import OrderList from "./components/OrderList";
import { DataState } from "./models/models";
import { useEffect } from "react";
import { updateFIlter } from "./redux/DataSlice";

function App() {
  const data = useSelector((state: DataState) => state.data.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFIlter());
  }, [data]);

  return (
    <div>
      <FIlter />
      <AddForm />
      <OrderList />
    </div>
  );
}

export default App;
