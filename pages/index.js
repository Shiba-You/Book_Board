import Link from 'next/link'
import Head from 'next/head'
import Header from './components/header'
import Content from './components/content'
import useSWR from 'swr'

// import Styles from '../styles/Home.module.css'

export default function Home() {
  const title = "Home"

  const fetcher = url => fetch(url).then(r => r.json())
  const {data, error} = useSWR('/api/message', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Content>
      <Head>
        <title>{ title }</title>
      </Head>
      <Header title= { title } />
      <p>{data.message}</p>
      <Link href={`/about/`}>
        <button>
          Aboutへ
        </button>
      </Link>
      <style jsx>{`
        h1 {
          color: blue
        }
      `}</style>
    </Content>
  )
}