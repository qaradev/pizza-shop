import React from "react";

const lists = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories = ({ activeIndex, setActiveIndex }) => {
  return (
    <div className="categories">
      <ul>
        {lists.map((list, i) => (
          <li
            className={activeIndex === i ? "active" : ""}
            key={i}
            onClick={() => setActiveIndex(i)}
          >
            {list}
          </li>
        ))}
      </ul>
    </div>
  );
};
