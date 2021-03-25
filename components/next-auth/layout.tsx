import Header from 'components/next-auth/header'
import Footer from 'components/next-auth/footer'
import React from "react";


interface IProps {
  children: React.ReactNode
}

export default function Layout ({children}: IProps) {
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}