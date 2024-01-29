import React from "react";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { selectFilter, setCategoryId } from "../redux/slices/filterSlice";
import { fetchPizza, selectPizzaData } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const {categoryId, sort, searchValue} = useSelector(selectFilter);
  const sortType = sort.sortProp;
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  }

  const getPizza = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    
    dispatch(fetchPizza({ order, sortBy, category, search }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizza();
  }, [categoryId, sortType, searchValue]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error">
          <h2>Ошибка😕</h2>
          <p>Пиццы не смогли загрузиться  </p>
          <p>Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
    </div>
  );
};

export default Home;