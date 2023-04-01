import "bootstrap/dist/css/bootstrap.min.css"

import { SessionProvider } from "next-auth/react"

import Header from "../components/Header"

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
