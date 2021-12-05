import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

export default function  SearchWindow(props) {
  // const router = useRouter();
  const searchLabel = "検索"

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={10} md={4}>
        <TextField
          label={searchLabel}
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={2} md={1}>
        <Button
          color="primary"
          component="span"
          size="large"
        >
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  )
};
