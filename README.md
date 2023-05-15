# CoupleGoalsReact

Frontend (netlify) : https://couplegoals.netlify.app/
Backend (heroku) : 

Notes : https://www.conventionalcommits.org/en/v1.0.0/

Title:CoupleGoals

Description: A goal setting app that allows couples to set and track shared goals, such as saving money for house, vacation, starting a business or learning a new language. The app can include features like progress trackers, reminders , motivational messages to help couples stay on track.

These are a few ideas for private apps that couples can use to strengthen their relationship and deepen their connection.

# System Architecture

<img width="1173" alt="Screenshot 2023-04-03 at 11 38 08 PM" src="https://user-images.githubusercontent.com/65886071/229558890-84dee9a7-407e-4d7c-bbe4-ccc7ce945261.png">



Start Date: 27 March 2023 End Date: 10 Feb 2024

Tech stack:

Frontend: React (Shermaine)

Backend : NodeJS

Db: MySQL

Wrapper : Expo React Native

Notes: For some reason, for react native expo, was unable to connect redux toolkit to nodejs backend... the same code works exactly for react...
UI/UX Design: Shermaine

Db design: Shermaine

Deployment: Apple Appstore. (Shermaine)

Infra and devops:

Notion : https://www.notion.so/CoupleGoals-Board-c00bfa36ad1b4fa0895499c17f6b135a

Github Repo: https://github.com/shermainelim/CoupleGoals

Features :

- connection between 2 accs in 1 room
- anniversary date
- story
- how many days tgt alr
- birthday of both parties
- other event days like xmas , new year etc
- goal planner (shed weight)
- fitness tracker
- finance tracker (bto, vacation etc)

- Build a event note stick it , with cheer up messages, love messages and picture memories. (feature)
- adding color variation for cards


# Todo List
- [x] CRUD Finance Tracker
- [x] CRUD Goal Tracker 
- [x] Save and call data from mysql backend for Finance Tracker
- [x] Save and call data from mysql backend for Goal Tracker
- [ ] Implement UI for Story/Event Stick it notes
- [ ] CRUD Story/Event Stick it notes
- [x] Call Birthday/Anni Date data from db to Dashboard UI
- [x] Create custom alert messages with toast or custom component
- [x] Error handling (connection fail etc)

- [x] Establish connection between 2 accounts in 1 room lobby/couple space
- [x] Implement Login and Logout for First Person
- [x] Implement Login and Logout for Second Person
- [x] Implement Registration and validation logic
- [x] Setup Redux Toolkit state management for frontend
- [x] Setup backend db and nodejs connection to frontend
- [x] Implement UI screens for Welcome, Register, Login and Dashboard    
- [x] T & C Data Privacy
- [x] Delete Couple Space
- [x] Forget password
- [x] Change password
- [ ] Revamp UI to be web and mobile responsive
- [ ] Async local storage username and couple space
- [ ] Implement manual refresh icon and logic on dashboard for finance and goal tracker
- [x] Implement SMTP email for CRUD register , forget password and change password and delete couple space
- [ ] Refactor code
- [ ] wrap in react native webview for mobile use case
- [ ] implement devops and infra
- [ ] encrypt 2 passwords , how? and decrypt with bcrypt
- [ ] deploy to App stores Apple and Android


Members : Zane , Gerald, Shermaine, Wee Kiat
