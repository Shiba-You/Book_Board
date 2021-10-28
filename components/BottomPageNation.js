import { makeStyles } from '@material-ui/core/styles';
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from '@material-ui/lab/Pagination';

import { getArticlesCount } from '../utils/article';
import { getArticles } from "../utils/article";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    marginTop: 100,
  },
}));

export default function  BottomPageNation(props) {
  const { currentUser, setArticles } = props;
  const classes = useStyles();
  const router = useRouter();
  const [articlesCount, setArticlesCount] = useState();

  useEffect(() => {
    getArticlesCount(currentUser, setArticlesCount)
  }, []);

  // articlesの初期化
  useEffect(() => {
    getArticles(currentUser, setArticles, 1)
    return localStorage.clear("uid")                // TODO: localStorageの値をmypage退出時に削除する
    // localStorage.setItem('uid', JSON.stringify(formData))
  }, []);

  const handleChange = (e, page) => {
    console.log(page, Number(router.query.page))
    getArticles(currentUser, setArticles, page-Number(router.query.page))
    router.push({
      pathname: 'mypage/',
      query: { page },
    })
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={articlesCount}
        page={Number(router.query.page)}
        onChange={handleChange}
        color="primary"
      />
    </div>
  )
};
