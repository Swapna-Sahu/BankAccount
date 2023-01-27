import React from 'react'
import { NavLink } from "react-router-dom";
import '../App.css';
import img from '../images/danskeBank.png'

interface Inavigation {
  Path:string,
  name:string
}

type TNavigation =  Inavigation[]

const navigation:TNavigation = [
  { Path: "/accounts", name: "Accounts" },
  { Path: "/IpaymentsPage", name: "International Payment" },
  { Path: "/support", name: "Support" },
]

const NavBar = () => {
  return (
    <div className='home'>
      <section>
        <NavLink to="/" className="App-link "><img src={img} alt={'Dansk bank'} height='60' /></NavLink>
      </section>
      <section className="pages">
        {navigation.map((item, i) =>
          <NavLink key={item.name} to={item.Path} className={({ isActive }) => isActive ? "underline App-link" : "App-link"}>{item.name}</NavLink>
        )}
      </section>

    </div>
  )
}

export default NavBar