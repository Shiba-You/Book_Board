import Link from "next/link"
import Head from 'next/head'
import Header from '../components/header'
import Content from '../components/content'

export default function About() {
  const title = "About"
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