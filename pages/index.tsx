import type { NextPage } from 'next'
import Head from 'next/head'
import Login from '../components/Login'
const LoginPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>New Combin</title>
        <meta name="description" content="By Matias Rios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Login/>
      </main>

      
    </div>
  )
}

export default LoginPage
