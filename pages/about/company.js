import Link from "next/link"
import Head from 'next/head'
import Header from '../components/header'
import Content from '../components/content'

export default function Company() {
  const title = "Compnay"
  return (
    <Content>
      <Head>
        <title>{ title }</title>
      </Head>
      <Header title= { title } />
      <Link href={`/`}>
        <button>
          Homeへ
        </button>
      </Link>
    </Content>
  )
}