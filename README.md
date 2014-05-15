# AppChat Demo - a realtime chatroom application using node.js, express.js, socket.io and AngularJS

## Libraries used
### Backend
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB</li>
  <li>Helmet middleware</li>  
  <li>Socket.io</li>
  <li>Underscore.js</li>
</ul>

### Frontend
<ul>
  <li>SCSS / SASS</li>
  <li>AngularJS</li>
  <li>Zurb Foundation</li>
</ul>

# Functionality

<ul>
  <li>People can join the chat server after picking a username (usernames have to be unique per user, alternative usernames are generated as well)</li>
  <li>Once connected people can create a  room (roomnames again have to be unique)</li>
  <li>User agent and geolocation are both automatically detected (geo location has to be approved in the browser first of course)</li>
  <li>People can start chatting with each other once they are in a a room</li>
  <li>Chat history is also displayed, by default the last 10 messages are shown (this setting can be changed)</li>
  <li>'who is typing' feature is also enabled</li>
    <li>Chats are persisted to no sql db based on room. When user joins room the last 10 messages of that room are fetched and displayed.</li>
</ul>

# Setup and configuration

Make sure that you update <strong>app.js</strong> at the backend with your own IP address or hostname otherwise it will default to: `localhost:3000`
<pre>app.set('port', process.env.PORT || 3000);
  app.set('ipaddr', process.env.IP || 'localhost');
</pre>

Also, tell the frontend where to listen for socket.io - update <strong>public/js/services.js</strong>:

<pre>var socket = io.connect('localhost:3000');</pre>
(the IP address or host name here should be the same that you've defined in <strong>app.js</strong> at the backend.)

To install the application execute <code>npm install && bower install</code> This will automatically install all frontend and backend dependencies.

Start up MongoDB in your terminal. Usually just by typing `mongod`
If you have OSX and install mongoDB with **homebrew** then in the terminal you can run `brew services start mongodb`

To launch application please execute <code>node server.js</code> in the terminal.


THATS IT! ENJOY!!






<br>
<br>
<br>
<br>
<br>
<br>


