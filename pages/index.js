import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/template/header'

export default function Home() {
  const title = "Home"

  return (
    <>
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
    </>
  )
}