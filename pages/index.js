import Head from 'next/head'
import Image from 'next/image'
import SideNav from '../Components/SideNav'

export default function Home() {
  return (
    <div >
      <Head>
        <title>WhatsApp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
      </Head>
      <SideNav></SideNav>
    </div>
  )
}
