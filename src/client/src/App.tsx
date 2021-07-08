import React, { useState, useEffect } from "react";
import { getUsers, getItems, getListOfAgesOfUsersWithItem } from "./api/API";
import UserInfo from "./components/UserInfo";
import ItemCount from "./components/ItemCount";

import "./styles/App.scss";

const App = function () {
  let [userInfo, setUserInfo] = useState(null);
  let [items, setItems] = useState(null);
  let [loading, setLoading] = useState(false);

  let [selectedItem, setSelectedItem] = useState("Item"); //Item is default value
  let [itemsCountByAge, setItemsCountByAge] = useState(null);

  //handle when user select a item
  const handleSelect = (item: string) => {
    setLoading(true);
    setSelectedItem(item);
    getListOfAgesOfUsersWithItem(item).then((ageGroups) => {
      setItemsCountByAge(ageGroups);
      setLoading(false);
    });
  };

  //fetch data when the app start up, this will happen only once
  useEffect(() => {
    setLoading(true);
    Promise.all([getUsers(), getItems()])
      .then(([users, items]) => {
        setUserInfo(users);
        setItems(items);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Cannot get data. Error: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app container">
      <div className="row text-center">
        {loading ? <h4 className="col">Please wait...</h4> : null}
      </div>
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
