# [Media-Tracker](https://media-tracker.netlify.app/)

Media-Tracker is a web app where you can keep track of your favourite media like anime, games, manga, books, etc.

You will need to register or log in using existing account to have access to it's full features because all data is being stored in a cloud database.

After signing in you can start adding your media straight away, just select the type of media that interests you and fill out the form (only title is required, you can fill the rest later) or you can use search function to get media from external API and it will automatically fill out everything for you.

And after that you can easily access your media, change the status, keep track of progress, sort, filter or even view various statistics and charts.

## Usage
1. Install dependencies
```
npm install
```

2. Set up your own firestore database at
https://console.firebase.google.com/u/0/

3. Create .env file in your project root directory with the following code:

```
REACT_APP_apiKey=xxx
REACT_APP_authDomain=xxx
REACT_APP_projectId=xxx
REACT_APP_storageBucket=gxxx
REACT_APP_messagingSenderId=xxx
REACT_APP_appId=xxx
REACT_APP_measurementId=xxx
```
and replace 'xxx' with your own firestore database config.
