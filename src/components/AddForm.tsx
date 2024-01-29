import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, changeData, stopRedact } from "../redux/DataSlice";
import { DataState, IsRedact } from "../models/models";

function AddForm() {
  const { redact, id } = useSelector(
    (state: { data: { isRedact: IsRedact } }) => state.data.isRedact
  );
  const data = useSelector((state: DataState) => state.data.data);

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [price, setPrice] = useState<number | string>("");

  useEffect(() => {
    if (redact) {
      const currentData = data.find((el) => el.id === id);
      if (currentData) {
        setText(currentData.name);
        setPrice(currentData.price);
      }
    }
  }, [redact, id, data]);

  const clear = () => {
    setText("");
    setPrice("");
  };

  const addItem = (evt: React.FormEvent) => {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    dispatch(
      addData({
        name: (target.name as HTMLFormElement[string]).value,
        price: target.price.value,
      })
    );
    clear();
  };

  const changeItem = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(changeData({ id, text, price }));
    clear();
    dispatch(stopRedact());
  };

  const cancel = () => {
    clear();
    dispatch(stopRedact());
  };

  return (
    <form
      className="add_form"
      id="add_form"
      onSubmit={redact ? changeItem : addItem}
    >
      <input
        type="text"
        id="name"
        value={text}
        onChange={(e: React.ChangeEvent) => {
          const target = e.target as HTMLFormElement;
          setText(target.value);
        }}
      />
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e: React.ChangeEvent) => {
          const target = e.target as HTMLInputElement;
          setPrice(Number(target.value));
        }}
      />
      <button>Save</button>
      {redact ? (
        <button type="button" onClick={cancel}>
          Cancel
        </button>
      ) : (
        ""
      )}
    </form>
  );
}

export default AddForm;
