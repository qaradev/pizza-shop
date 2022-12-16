import React from "react";

const Categories = () => {
  const lists = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <div className="categories">
      <ul>
        {lists.map((list, idx) => (
          <li
            className={activeIndex === idx ? "active" : ''}
            key={idx}
            onClick={() => setActiveIndex(idx)}
          >
            {list}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
