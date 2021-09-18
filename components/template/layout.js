import Head from "next/head"
import { makeStyles } from '@material-ui/core/styles';

import Header from '../header'
import Footer from '../footer'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: 'auto',
    width: '80%',
    height: '1000px',
    marginTop: '48px',
  },
}));

export default function Layout(props) {
  const { title } = props
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={classes.main}>
        {props.children}
      </div>
      <Footer />
    </>
  )
}
