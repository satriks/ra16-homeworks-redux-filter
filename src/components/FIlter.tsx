import React from "react";
import { useDispatch } from "react-redux";
import { setFilter, stopFilter } from "../redux/DataSlice";

type Props = {};

function FIlter({}: Props) {
  const dispatch = useDispatch();

  const changeFilter = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const textFilter = target.value.trim().toLowerCase();
    textFilter && console.log(textFilter);
    textFilter && dispatch(setFilter({ text: textFilter }));
    !textFilter && dispatch(stopFilter());
  };

  return (
    <div className="filter__wrapper">
      <label htmlFor="filter">Введите для поиска: </label>
      <input id="filter" onChange={changeFilter} />
    </div>
  );
}

export default FIlter;
