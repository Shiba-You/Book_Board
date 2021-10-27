import { makeStyles } from '@material-ui/core/styles';
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from '@material-ui/lab/Pagination';
import { isObjEmpty } from '../utils/main';
import { getArticlesCount } from '../utils/article';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    marginTop: 100,
  },
}));

export default function  BottomPageNation(props) {
  const { currentUser } = props;
  const classes = useStyles();
  const router = useRouter();
  const [articlesCount, setArticlesCount] = useState();
  useEffect(() => {
    getArticlesCount(currentUser, setArticlesCount)
  }, []);
  const handleChange = (e, page) => {
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
