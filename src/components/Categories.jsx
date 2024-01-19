import React from "react";

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((values, i) => (
          <li
            onClick={() => onClickCategory(i)}
            className={activeIndex === i ? "active" : ""}
          >
            {values}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
