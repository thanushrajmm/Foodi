import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards';
import { FaFilter } from "react-icons/fa"; 
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // loading data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // filtering data based on category
  const filterItems = (category) => {
    const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
  };

  // show all data function
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
  };

  // sorting based on A-Z, Z-A, low-to-high pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
  };

  return (
    <div>
      {/* menu banner */}
      <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          {/* text */}
          <div className='text-center space-y-7 py-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              For the Love of Delicious 
              <span className='text-green'> Food</span>
            </h2>
            <p className='text-xl text-[#4A4A4A] text-xl md:w-4/5 mx-auto'>
              Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut
              Pumpkin, Tokusen Wagyu, Olivas Rellenas, and more for a moderate cost
            </p>
            <button className='btn bg-green px-8 py-3 font-semibold text-white rounded-full'>
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className='section-container'>
        {/* filtering and sort */}
        <div>
          {/* all category btns */}
          <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
            <button onClick={showAll}
            className={selectedCategory === "all" ? "active" : ""}
            >All</button>
            <button onClick={() => filterItems("salad")}className={selectedCategory === "salad" ? "active" : ""}>
              Salad</button>
            <button onClick={() => filterItems("pizza")}className={selectedCategory === "pizza" ? "active" : ""}>
              Pizza</button>
            <button onClick={() => filterItems("soup")}className={selectedCategory === "soup" ? "active" : ""}>
              Soups</button>
            <button onClick={() => filterItems("dessert")}className={selectedCategory === "dessert" ? "active" : ""}>
              Desserts</button>
            <button onClick={() => filterItems("drinks")}className={selectedCategory === "drinks" ? "active" : ""}>
              Drinks</button>
          </div>

          {/* sorting filter */}

          <div>
            <div className='bg-green p-2'>
              <FaFilter className='h-4 w-4 text-white'/>
            </div>

            {/* sorrting options */}
            <select name="sort" id="sort">
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className = ""
            </select>
          </div>
        </div>
        {/* product card */}
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-1'>
          {
            filteredItems.map((item) => (
              <Cards key={item._id} item={item} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Menu;
