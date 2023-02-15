Tasks:

SideNote: try not to clutter here.

Continue with the Homepage @anubhav


-> Add in the css and make sure that is the default page we go to.

-> Focus only on the student and tpr view at the moment.

-> Make sure it leads to all required places(check the use cases in srs)


Fix the navbar @manthan


-> The logout button is added, make sure it sends a request to /logout when it is clicked.

-> Added a new navbar, but it needs fixing, you'll know when you run it. Fix the css.

-> Lastly, make sure all the links work, and the navbar links to all important locations.

=======

To start the application, run the following

git pull

if you haven't yet cloned the repository, run

git clone <insert-repo-link-here>

if you haven't yet cloned the repository, run

`git clone <insert-repo-link-here>`

(ctrl + shift + 5) or open a split terminal

to configure backblaze

Create a backblaze account.

Go to Account->App Keys.

Either use the master key or create a new one depending on your choice. Just make sure the key has both read and write access.

In B2 Cloud Storage->Buckets, create a bucket called resume-manager;

Open the Server directory in the project and in the directory create a file called .env.

in the .env file, enter the following keys

APPLICATION_KEY_ID='Your KeyID of the key'

APPLICATION_KEY='Your Application Key'

Now to run the project:

on the left terminal

cd Server

npm i

npm run dev

on the right terminal

cd client

npm i

npm start

SERVER DOCS: When the server is running, those working on the client side can see the server docs at "http://localhost:4000/api-docs/"

NOTE: frontend might be broken for a while, either me or the frontend team will fix it.

29/1/23 19:01

Entire client side ported to React.

30/01/23 9:03

updated database

30/01/23 19:13

added backblaze and optimized routes.

01/02/23

got passport register route working, will work on swagger and login asap.

02/02/23

swagger, login and logout are working.

NOTE: FRONTEND IS BROKEN, WILL FIX IT ASAP.

04/02/23

now resumes are uploaded to backblaze, and a reference is stored in mongodb to locate the resume. Frontend still broken. Gotta fix that asap.

05/02/23

frontend patched up, files are uploading and login/register possible. Still need a logout button and error messages are a bit weird, gotta fix that too.
