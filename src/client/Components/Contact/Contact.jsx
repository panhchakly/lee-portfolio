import React, {useRef, useState, useContext} from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { themeContext } from '../../../Context';

function Contact() {
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    const [done, setDone] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_e6nobyp', 'template_toiflgx', form.current, 'lUJMppoaeUyvdVh0f')
        .then((result) => {
            setDone(true);
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <div className="contact-form">
            <div className="w-left">
                <div className="awesome">
                    <span style={{color: darkMode ? 'white' : ''}}>Get in touch</span>
                    <span>Contact me</span>
                    <div className="blur s-blur1" style={{background: "#ABF1FF94"}}></div>
                </div>
            </div>
            <div className="c-right">
                <form ref={form} onSubmit={sendEmail}>
                    <input type="text" name="user_name" className="user" placeholder="Name"/>
                    <input type="email" name="user_email" className="user" placeholder="Email"/>
                    <textarea name="message" className="user" placeholder="Message"/>
                    <input type="submit" value="Send" className="button"/>
                    <span>{done && "Thanks for Contacting me"}</span>
                    <div className="blur c-blur1" style={{background: "var(--purple)"}}></div>
                </form>
            </div>
        </div>
    )
}

export default Contact