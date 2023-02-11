Tasks:

<<<<<<< HEAD
Create a homepage @anubhav

-> For now a link for the student to go to the upload page.
-> A link to a update form that will update the data of the user. (I will create these later.)
Create a userpage @manthan

-> A button to logout.
-> Some user Info.
=======
Tasks:

Create a homepage @anubhav

    -> For now a link for the student to go to the upload page.
    -> A link to a update form that will update the data of the user. (I will create these later.)


Create a userpage @manthan

    -> A button to logout.
    -> Some user Info.

>>>>>>> df7aa654ddfdc76644f6e950d0ac004eccef5f7f
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