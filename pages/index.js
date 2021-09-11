import Link from 'next/link'
import Head from 'next/head'
import Header from './components/header'
import Content from './components/content'

// SWR（api操作） の使い方チュートリアル
// import useSWR from 'swr'

// import Styles from '../styles/Home.module.css'

export default function Home() {
  const title = "Home"

  // SWR（api操作） の使い方チュートリアル
  // const fetcher = url => fetch(url).then(r => r.json())
  // const {data, error} = useSWR('/api/message', fetcher)
  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  return (
    <Content>
      <Head>
        <title>{ title }</title>
      </Head>
      <Header title= { title } />
      <Link href={`/login/`}>
        <button>
          Loginへ
        </button>
      </Link>
      <Link href={`/signup/`}>
        <button>
          Signupへ
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