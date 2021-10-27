import Router from "next/router";

export const alertAndRedirect = (msg, to) => {
  alert(msg + 'に成功しました')
  if (to) {
    Router.push({
      pathname: to,
      query: {page: 1}
    });
  }
};

export const confirmAndBack = () => {
  const result = confirm('編集を頭中で終了してもよろしいですか？')
  if (result) {
    Router.back();
  }
};