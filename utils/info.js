import Router from "next/router";

export const alertAndRedirect = (msg, to) => {
  alert(msg + 'に成功しました')
  if (to) {
    Router.push(to);
  }
};