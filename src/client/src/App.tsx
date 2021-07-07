import React, { useState, useEffect } from "react";
import { getUsers, getItems, getListOfAgesOfUsersWithItem } from "./api/API";
import UserInfo from "./components/UserInfo";
import ItemCount from "./components/ItemCount";

import "./styles/App.scss";

const App = function () {
  let [userInfo, setUserInfo] = useState(null);
  let [items, setItems] = useState(null);
  let [selectedItem, setSelectedItem] = useState("Item"); //Item is default value
  let [itemsCountByAge, setItemsCountByAge] = useState(null);

  //handle when user select a item
  const handleSelect = (item: string) => {
    setSelectedItem(item);
    getListOfAgesOfUsersWithItem(item).then((ageGroups) => {
      setItemsCountByAge(ageGroups);
    });
  };

  //fetch data when the app start up, this will happen only once
  useEffect(() => {
    Promise.all([getUsers(), getItems()])
      .then(([users, items]) => {
        setUserInfo(users);
        setItems(items);
      })
      .catch((error) => {
        console.log("Cannot get data. Error: ", error);
      });
  }, []);

  return (
    <div className="app container">
      <UserInfo userInfo={userInfo}></UserInfo>
      <ItemCount
        handleSelect={handleSelect}
        items={items}
        itemsCountByAge={itemsCountByAge}
        selectedItem={selectedItem}
      ></ItemCount>
    </div>
  );
};

export default App;
