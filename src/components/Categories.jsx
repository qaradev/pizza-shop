import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const Categories = () => {
  const lists = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const dispatch = useDispatch();
  const { categoryId } = useSelector((state) => state.filter);

  return (
    <div className="categories">
      <ul>
        {lists.map((list, idx) => (
          <li
            className={categoryId === idx ? "active" : ""}
            key={idx}
            onClick={() => dispatch(setCategoryId(idx))}
          >
            {list}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
