import { useState } from "react";
import { useRouter } from "next/router";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

import { logout } from "../../utils/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%",
  },
  appBar: {
    position: "absolute",
  },
  title: {
    flexGrow: 1,
  }
}));


export default function Header(props) {
  const router = useRouter();
  const classes = useStyles();
  const { currentUser } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    await logout();
    router.push('/login');
  }

  const toProfile = () => {
    router.push('/profile');
  }

  const backHome = () => {
    console.log(router)
    router.push('/mypage')
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" className={classes.title}>
            <a onClick={() => backHome()}>Book Board</a>
          </Typography>
          {currentUser && (
            <div>
              <Typography variant="button" className={classes.title}>
                {currentUser.name}
              </Typography>
              <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem 
                  onClick={toProfile}
                >
                  <Typography variant="button" className={classes.title}>
                    プロフィール
                  </Typography>
                </MenuItem>
                <MenuItem 
                  onClick={onLogout}
                >
                  <Typography variant="button" className={classes.title}>
                    ログアウト
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
