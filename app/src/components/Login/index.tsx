import React from "react";
import { History, LocationState } from "history";
import styles from './Login.module.css'
import { Redirect } from 'react-router-dom'
import { useForm } from "./useForm";
import APILogin from '../../api/APILogin'

interface userInfo {
  token: string,
  username: string,
  name: string
}

interface Props {
  onLoginRedirect: string,
  history: History<LocationState>
}

const Index: React.FC<Props> = ({
  history,
  onLoginRedirect
}) => {

  const initialState = {
    username: "",
    password: "",
  };

  // getting the event handlers from our custom hook
  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialState
  );

  function loginUserCallback() {
    console.log(values)
    APILogin(values)
      .then((data) => {
        if (data.status === 200) {
          const userInfo: userInfo = data.data
          if (userInfo) {
            if (userInfo.token) {
              localStorage.setItem("token", userInfo.token)
              localStorage.setItem("name", userInfo.name)
              history.push(onLoginRedirect)
            }
          }
        } else {
          alert('Login failed!')
        }
      })
  }

  const isLogin = localStorage.getItem('token')

  if (!isLogin) {
    return (
      <div className={styles.containerFlex}>
        <div className={styles.container}>
          <div className={styles.logo}></div>
          <div className={styles.logoItem}>
            <form className={`${styles.form} ${styles.formLogin}`} onSubmit={onSubmit}>
              <div className={styles.formField}>
                <label className={styles.user} ><span className={styles.spanBabel}>Username</span></label>
                <input id="login-username" name="username" type="text" className={styles.formInput} placeholder="Username" onChange={onChange} required />
              </div>
              <div className={styles.formField}>
                <label className={styles.lock}><span className={styles.spanBabel}>Password</span></label>
                <input id="login-password" name="password" type="password" className={styles.formInput} placeholder="Password" onChange={onChange} required />
              </div>
              <div className={styles.formField}>
                <input type="submit" defaultValue="Log in" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  } else return <><Redirect to="/dashboard" /></>
}

export default Index;