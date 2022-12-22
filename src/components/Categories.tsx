import React from 'react';

type CategoriesProps = {
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ activeIndex, setActiveIndex }) => {
  const lists = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {lists.map((list, i) => (
          <li
            className={activeIndex === i ? 'active' : ''}
            key={i}
            onClick={() => setActiveIndex(i)}
          >
            {list}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories
