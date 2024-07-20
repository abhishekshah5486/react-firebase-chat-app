import './Login.css';
import userProfile from '../../Assets/Images/userProfile2.png';
import { useState } from 'react';
import githubLogo from '../../Assets/Icons/github-logo.svg';
import googleLogo from '../../Assets/Icons/google-logo.svg';
import appleLogo2 from '../../Assets/Icons/appleLogo2.svg';
import { message } from 'antd';
import { app } from '../../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {doc, setDoc} from 'firebase/firestore';

import upload from '../../lib/upload';

const auth = getAuth(app);
const firestore = getFirestore(app);

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })
    const [loginLoading, setLoginLoading] = useState(false);
    const [signupLoading, setSignupLoading] = useState(false);

    const handleAvatar = (e) => {
        if (e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }

    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        setSignupLoading(true);
        const formData = new FormData(e.target);
        const {username, email, password} = Object.fromEntries(formData);
        
        try {
            let registeredUser;
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            ).then( async (userCredential) => {
                registeredUser = userCredential.user;
                message.success("Your account has been created.");
                setTimeout(() => {
                    message.success("Please log in to access your account.")
                }, 1000)
            });

            let imageUrl;
            if (avatar.file) imageUrl = await upload(avatar.file);
            else imageUrl = userProfile;
            await setDoc(doc(collection(firestore, 'users'), registeredUser.uid), {
                username,
                email,
                password,
                avatar: imageUrl,
                id: registeredUser.uid,
                blocked: []
            });

            await setDoc(doc(collection(firestore, 'userchats'), registeredUser.uid), {
                chats: []
            });
        } catch (err) {
            message.error("Email already registered. Please login to continue.");
            console.log(err.message);
        } finally{
            setSignupLoading(false);
        }

    }
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        const formData = new FormData(e.target);
        const {email, password} = Object.fromEntries(formData);
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            ).then(() => {
                message.success("Logged in successfully.");
            })
        } catch (err) {
            message.error("Invalid email or password.");
            console.log(err.message);
        } finally{
            setLoginLoading(false);
        }
    }
    return (
        <div className='login-page'>
            <div className="login">
                <h2>Welcome back,</h2>
                <form action="" className='login-form' onSubmit={handleSignIn}>
                    <input type="email" placeholder='Email' required name='email'/>
                    <input type="password" placeholder='Password' required name='password'/>
                    <button type='submit' disabled={loginLoading}>{loginLoading ? "Loading" : "Sign In"}</button>
                </form>
                <div className="log-in-accounts">
                    <ul>
                        <li className="google-login">
                            <button className="google-login-btn">
                                <div className="google-login-div xR230zZLI">
                                    <img src={googleLogo} alt="" className='google-icon'/>
                                    <div className="xR230zZTp">
                                        <h3>Continue with Google</h3>
                                    </div>   
                                </div>
                            </button>
                        </li>
                        <li className="github-login">
                            <button className="github-login-btn">
                                <div className="github-login-div xR230zZLI">
                                    <img src={githubLogo} alt="" className='github-icon'/>
                                    <div className="xR230zZTp">
                                        <h3>Continue with Github</h3>
                                    </div>    
                                </div>
                            </button>
                        </li>
                        <li className="apple-login">
                            <button className="apple-login-btn">
                                <div className="apple-login-div xR230zZLI">
                                    <img src={appleLogo2} alt="" className='apple-icon'/>
                                    <div className="xR230zZTp">
                                        <h3>Continue with Apple</h3>
                                    </div>  
                                </div>
                            </button>
                        </li>
                    </ul>
            </div>
            </div>
            <div className="separator"></div>
            <div className="register">
                <h2>New User? Sign up now.</h2>
                <form action="" className='register-form' onSubmit={handleSignUp}>
                    <label htmlFor="file" className='upload-profile'>
                        <img src={avatar.url || userProfile} alt="" />
                        Upload profile
                    </label>
                    <input type="file" id='file' style={{display:"none"}} onChange={handleAvatar}/>
                    <input type="text" placeholder='Enter name' name='username' required/>
                    <input type="email" placeholder='Enter email' name='email' required/>
                    <input type="password" placeholder='Enter password' name='password' required/>
                    <button type='submit'  disabled={signupLoading}>{signupLoading ? "Loading" : "Register"}</button>
                </form>
            </div>
        </div>
    )
}
export default Login;