import { DataState, FIlter } from "../models/models";
import Item from "./Item";
import { useSelector } from "react-redux";

function OrderList() {
  const data = useSelector((state: DataState) => state.data.data);
  const { filterData, isFilter } = useSelector(
    (state: { data: { filter: FIlter } }) => state.data.filter
  );

  return (
    <ul className="order_list">
      {(isFilter ? filterData : data).map((el) => (
        <Item element={el} key={el.id} />
      ))}
    </ul>
  );
}

export default OrderList;
