import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItem } from '../../redux/cart/selector';
import { addToCartItem } from '../../redux/cart/slice';

type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const cartItem = useSelector(selectCartItem(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const dispatch = useDispatch();

  const typeNames = ['тонкое', 'традиционное'];

  const handleClickAdd = () => {
    const obj = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addToCartItem(obj));
  };

  return (
    <div className='pizza-center'>
      <div className='pizza-block'>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        <h4 className='pizza-block__title'>{title}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {types.map((item, idx) => (
              <li
                className={activeType === idx ? 'active' : ''}
                key={idx}
                onClick={() => setActiveType(idx)}
              >
                {typeNames[item]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, idx) => (
              <li
                className={activeSize === idx ? 'active' : ''}
                key={idx}
                onClick={() => setActiveSize(idx)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <div
            className='button button--outline button--add'
            onClick={handleClickAdd}
          >
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            <i>{addedCount}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
