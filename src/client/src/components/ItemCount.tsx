import React, { FC } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { ItemCount } from "../api/APIinterface";

interface ItemCountProps {
  items: string[];
  itemsCountByAge: ItemCount[];
  handleSelect: (item: string) => void;
  selectedItem: string;
}

const ItemCount: FC<ItemCountProps> = (props) => {
  const { items, itemsCountByAge, handleSelect, selectedItem } = props;

  const itemsDropdown =
    items === null ? null : (
      <DropdownButton
        className="user-item__dropdown"
        id="item-dropdown-button"
        title={selectedItem || "Item"}
        onSelect={(item) => handleSelect(item)}
      >
        {items.map((item, ind) => (
          <Dropdown.Item
            active={selectedItem == item}
            key={item}
            eventKey={item}
          >
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );

  const itemCountByAgeDisplay =
    itemsCountByAge === null ? null : (
      <table className="table table-striped age-group">
        <thead className="thead-dark">
          <tr>
            <th className="text-left" scope="col">
              Age
            </th>
            <th className="text-right" scope="col">
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsCountByAge.map((ageGroup) => (
            <tr key={ageGroup.age}>
              <td className="text-left">{ageGroup.age}</td>
              <td className="text-right">{ageGroup.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div className="user-item d-flex row justify-content-center flex-column text-center align-items-center">
      <h1>Age demographic of users with {selectedItem}</h1>
      <div className="d-flex row justify-content-center flex-column text-center align-items-center">
        <label className="item-label" htmlFor="item">
          Item:
        </label>
        {itemsDropdown}
      </div>
      {itemCountByAgeDisplay}
    </div>
  );
};

export default ItemCount;
