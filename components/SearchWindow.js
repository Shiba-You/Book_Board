import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

import { getArticles } from "../utils/article";

export default function  SearchWindow(props) {
  const { currentUser, setArticles } = props;
  const router = useRouter();
  const searchLabel = "検索"
  const [searchWord, setSearchWord] = useState(router.query.searchWord ? router.query.searchWord : "");

  const PAGE_COUNT = 3

  const searchArticle = async (e, page) => {
    const nextArticles = await getArticles(currentUser, router.query.page, PAGE_COUNT, searchWord)
    setArticles(nextArticles)
    router.push({
      pathname: 'mypage/',
      query: { 
        page: router.query.page,
        searchWord
      }
    })
  };

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={10} md={4}>
        <TextField
          label={searchLabel}
          fullWidth
          size="small"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </Grid>
      <Grid item xs={2} md={1}>
        <Button
          color="primary"
          component="span"
          size="large"
          onClick={() => searchArticle()}
        >
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  )
};
