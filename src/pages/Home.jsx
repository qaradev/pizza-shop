import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchConext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import { Categories } from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagintaion";
import NotFoundBlock from "../components/NotFoundBlock";
import { setFilters, setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue } = React.useContext(SearchConext);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPizzas = () => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = sort.sortProperty.replace("-", "");

    axios
      .get(
        `https://639ca75242e3ad6927387619.mockapi.io/items?page=${currentPage}&limit=4&${category}&orderBy=${sortBy}&order=${order}&search=${searchValue}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  const onChangeCategory = (id) => dispatch(setCategoryId(id));

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sorts = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sorts,
        })
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

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
    <div className="content__items">
      {[...new Array(6)].map((_, idx) => (
        <Skeleton key={idx} />
      ))}
    </div>
  );

  const pizzaItems =
    pizzas.length > 0 ? (
      <div className="content__items">
        {pizzas.map((item) => (
          <PizzaBlock {...item} key={item.id} />
        ))}
      </div>
    ) : (
      <NotFoundBlock />
    );

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          setActiveIndex={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {isLoading ? skeletons : pizzaItems}
      {pizzas.length > 0 && <Pagination />}
    </div>
  );
};

export default Home;
