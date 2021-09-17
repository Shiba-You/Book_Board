import Head from "next/head"

import Header from '../header'
import Footer from '../footer'
import styles from '../../styles/Layout.module.css'

export default function Layout(props) {
  const { title } = props

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={styles.main}>
        {props.children}
      </div>
      <Footer />
    </>
  )
}
