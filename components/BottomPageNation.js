import { makeStyles } from '@material-ui/core/styles';
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from '@material-ui/lab/Pagination';

import { getPageCount } from '../utils/article';
// import { getArticlesCount } from '../utils/article';
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
  const [pageCount, setPageCount] = useState();

  const PAGE_COUNT = 3

  useEffect(() => {
    const f = async () => {
      const [articles, pageCount] = await Promise.all([
        getArticles(currentUser, Number(router.query.page), PAGE_COUNT),
        getPageCount(currentUser, PAGE_COUNT)
      ])
      setArticles(articles)
      setPageCount(pageCount)
    }
    f();
  }, []);

  const handleChange = async (e, page) => {
    const nextArticles = await getArticles(currentUser, page, PAGE_COUNT)
    setArticles(nextArticles)
    router.push({
      pathname: 'mypage/',
      query: { page },
    })
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={pageCount}
        page={Number(router.query.page)}
        onChange={handleChange}
        color="primary"
      />
    </div>
  )
};
