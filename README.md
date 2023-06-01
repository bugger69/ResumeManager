=======

# To clone the repo

git pull

if you haven't yet cloned the repository, run

`git clone <insert-repo-link-here>`

 # To configure backblaze and run the app

Create a backblaze account.

Go to Account->App Keys.

Either use the master key or create a new one depending on your choice. Just make sure the key has both read and write access.

In B2 Cloud Storage->Buckets, create a bucket called resume-manager;

Open the Server directory in the project and in the directory create a file called .env.

in the .env file, enter the following keys

APPLICATION_KEY_ID='Your KeyID of the key'

APPLICATION_KEY='Your Application Key'

Now to run the project:

(ctrl + shift + 5) or open a split terminal

on the left terminal:

 cd Server

 npm i

 npm run dev

on the right terminal:

 cd client

 npm i

 npm start

SERVER DOCS: When the server is running, those working on the client side can see the server docs at "http://localhost:4000/api-docs/"
