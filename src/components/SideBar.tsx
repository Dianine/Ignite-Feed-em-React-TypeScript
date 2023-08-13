import {PencilLine} from 'phosphor-react'
import Profile from '../assets/profile.png'
import styles from './SideBar.module.css'

import Avatar from './Avatar'

export default function SideBar(){
  return(
    <aside className={styles.sideBar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1603468620905-8de7d86b781e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=50" alt="" 
      />
      <div className={styles.profile}>

        <Avatar hasBorder={false} src={Profile}/>
        
        <strong>Dianine Costa</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20}/>
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}