# youtubeProjectServer - Part2 - server

Insturctions for part2:


Inorder to run this code - you should load to the mongo the json files - to have default users and videos.

Before that you need to download all the moudles of the npm - to do that write in CL npm install.

For load the data - first you need to open mongo compass and connect.

Then you need to run the server application by writing to the CL 'npm start' , that will initialize the database in mogno compass - this is not loading the default users and videos, that will done manualy.

Now - load manualy the data to the mongo schemas - to do that - take this files and in mongo, in test/users click on add data and load from this json file - [user.json](https://github.com/user-attachments/files/16089359/user.json) . Do the same for the videos (but under test/videos) [vid.json](https://github.com/user-attachments/files/16089369/vid.json) .

Than you should run the server by writing in CL 'npm start' and then you should open in your browser this URL - http://localhost:12345/ .
