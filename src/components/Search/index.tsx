import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';

const Search = () => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const updetSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updetSearchValue(event.target.value);
  };

  return (
    <form className={styles.root}>
      <div>
        <svg
          width='24px'
          height='24px'
          version='1.1'
          viewBox='0 0 512 512'
          xmlns='http://www.w3.org/2000/svg'
          className={styles.searchIcon}
        >
          <path d='M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z' />
        </svg>
        <input
          type='search'
          placeholder='Поиск...'
          value={value}
          onChange={(e) => onChangeInput(e)}
        />
      </div>
    </form>
  );
};

export default Search;
