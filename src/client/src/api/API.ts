const baseURL = "http://localhost:3000";
const PATH = {
  items: "items",
  users: "users",
  userAgeByItem: "users/age",
};

export const getUsers = () =>
  fetch([baseURL, PATH.users].join("/"), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());

export const getItems = () =>
  fetch([baseURL, PATH.items].join("/"), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());

export const getListOfAgesOfUsersWithItem = (item: string) =>
  fetch([baseURL, PATH.userAgeByItem, item].join("/"), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());
