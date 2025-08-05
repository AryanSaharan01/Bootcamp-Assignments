
import React from 'react'
import './pc.css' 


const ProfileCard = () => {
  return (
    <>

    <div className="id-card-container">
        <div id="idCard" className="id-card flex flex-col items-center text-center">
            <img src="https://t4.ftcdn.net/jpg/03/90/33/43/360_F_390334321_IlWexCFcXEJOuC1nWpBrPYRjFw8kXefg.jpg" className="profile-photo" alt="Profile" />


          
            <h1 id="userName" className="name">Sachidanand Tiwari</h1>
            <p id="userTitle" className="title">SOFTWARE DEVELOPER</p>

            <div className="w-full text-left">
                <h3 className="section-title">Contact Info</h3>
                <ul className="details-list contact-info">
                    <li>
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 20h2V4h-2M6 20h2V4H6M11 20h2V4h-2"/></svg>
                        <span id="userId">ID: 2201010068</span>
                    </li>
                    <li>
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                        <a href="pratibhaa2005@gmail.com" id="Email">2201010068@krmu.edu.in</a>
                    </li>
                    <li>
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5V12h2v5.5h-2zm-1-8h2V7h-2v2z"/></svg>
                        <span id="userCompany">Company: KRMU</span>
                    </li>
                </ul>
            </div>
            <div id="editFields" className="edit-fields w-full text-left">
                <label for="inputName">Name</label>
                <input type="text" id="inputName" placeholder="Enter Name"></input>

                <label for="inputTitle">Title</label>
                <input type="text" id="inputTitle" placeholder="Enter Title"></input>

                <label for="inputCompany">Company</label>
                <input type="text" id="inputCompany" placeholder="Enter Company"></input>

                <label for="inputEmail">Email</label>
                <input type="email" id="inputEmail" placeholder="Enter Email"></input>
                
    
            </div>
        </div>
    </div>


    </>
  )
}

export default ProfileCard