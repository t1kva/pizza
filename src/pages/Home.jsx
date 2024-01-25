import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { SearchContext } from "../App"
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sort} = useSelector((state) => state.filter);
  const sortType = sort.sortProp;

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://65aaadff081bd82e1d978bf3.mockapi.io/items?${category}&sortby=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          :  pizzas}
      </div>
    </div>
  );
};

export default Home;
