import React, { useState,useEffect, Profiler } from 'react';
import { auth,provider,storage,db } from '../config';
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore"; 
function AuthPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [err,setErr]=useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };
  const handlesubmitlogin=(e)=>{
    e.preventDefault();
  }
  const handlesubmitregistre = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', null, null, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateProfile(res.user, {
          displayName: username,
          photoURL: downloadURL,
        });
  
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          username,
          email,
          photoURL: downloadURL,
        });
      });
    } catch (err) {
      setErr(true);
    }
  };
  
  


  const [value,setValue] = useState('')
  const handleClick =()=>{
      signInWithPopup(auth,provider).then((data)=>{
          setValue(data.user.email)
          localStorage.setItem("email",data.user.email);
          navigate('/home');
      })
  }

  useEffect(()=>{
      setValue(localStorage.getItem('email'))
  })
  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handlesubmitlogin} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
           
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              
      
              <button onClick={handleClick} className="social-icon">
                <i className="fab fa-google"></i>
              </button>
           
            </div>
          </form>
          <form onSubmit={ handlesubmitregistre} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input  style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <div className="upload-avatar">
              <img className='avatar' src='https://img.freepik.com/vecteurs-premium/avatar-jeune-homme-souriant-homme-moustache-barbe-brune-cheveux-portant-pull-jaune-sweat-shirt-3d-vecteur-personnes-illustration-personnage-style-minimal-dessin-anime_365941-860.jpg?w=740' alt="" />
            <span>Add an avatar</span>
            </div>
          </label>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            {err && <span>something went wrong</span>}
            <div className="social-media">
           
              
              <button onClick={handleClick} className="social-icon">
                <i className="fab fa-google"></i>
              </button>
            
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
