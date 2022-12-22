/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useAppDispatch } from '../redux/store';

import { Categories, PizzaBlock, Sort, Skeleton, Pagination, NotFoundBlock } from '../components';
import { sortList } from '../components/Sort';
import { selectFilter } from '../redux/filter/selector';
import { selectPizza } from '../redux/pizza/selector';
import { fetchPizzas } from '../redux/pizza/slice';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';




const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
    const sortBy = sort.sortProperty.replace('-', '');

    dispatch(
      fetchPizzas({ currentPage, category, sortBy, order, searchValue })
    );
  };

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortObj = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          categoryId: Number(params.category),
          currentPage: Number(params.page),
          sort: sortObj || sortList[0],
          searchValue,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sort, currentPage, searchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        category: categoryId,
        page: currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sort.sortProperty, categoryId, currentPage, navigate]);

  const skeletons = (
    <div className='content__items'>
      {[...new Array(6)].map((_, idx) => (
        <Skeleton key={idx} />
      ))}
    </div>
  );

  const pizzaItems =
    items.length > 0 ? (
      <div className='content__items'>
        {items.map((item: any) => (
          <PizzaBlock {...item} key={item.id} />
        ))}
      </div>
    ) : (
      <NotFoundBlock />
    );

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          activeIndex={categoryId}
          setActiveIndex={onChangeCategory}
        />
        <Sort sort={sort} />
      </div>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произашла ошибка 😕</h2>
          <p>
            К сожеланию не удалось получить питсы.
            <br />
            Повторите попытку позже.
          </p>
        </div>
      ) : (
        <>
          <h2 className='content__title'>Все пиццы</h2>
          {status === 'loading' ? skeletons : pizzaItems}
        </>
      )}
      {items.length > 0 && <Pagination currentPage={currentPage} onChangePage={onChangePage} />}
    </div>
  );
};

export default Home;
