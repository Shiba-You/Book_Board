import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: 'right',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <hr />
      <footer className={classes.footer}>
        ©️Shiba-You
      </footer>
    </>
  );
}