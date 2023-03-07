# User Documentation

Q'Dub is a queueing web application intended to be used during office hours, more specifically UW CS office hours. The intention of this system is to help make office hours more systematic and straightforward for both the students and TAs. It allows valid UW students and TAs to log in and enqueue or start the queue for their intended course. With features such as step-in/step-out and displaying all students' questions, it will help make office hours more organized and efficient, while also promoting collaboration amongst the waiting students.

## How to install the software

- Install Docker using the official GUI installer from https://www.docker.com/
- Clone repo

## How to run the software and start up the system

- Make sure you are on the main branch and the Docker GUI is running
- In root directory run the following command:
- docker-compose up --build
  - For building the project the first time
- In the Docker GUI click on the qdub container and click the port link 3000:3000
- You may also navigate in your browser to [http://localhost:3000/](http://localhost:3000/)

## How to use the software

- The web-application is meant to be connected to the UW database and NetID but that is outside the scope of our project for this quarter. As an alternative, we have pre-populated the database with our NetID's.
- Valid student NetID's: izzyv, wenli, pashap, jaredt, triv
- Valid TA NetID's:
  - 403
    - jaredt, pashap
  - 455
    - wenli, izzyv
- There is no registration – that is abstracted away since with NetID that would redirect away from our page anyway. So when using the application you can login as a student or a TA and follow the prompts on the screen.
  - Both TAs and students can look at all the questions that are currently being asked. (Not currently implemented)
  - Student:
    - Choose a class you want to queue up for
    - Fill in the input field for what you need help with
  - TA:
    - If you entered the NetID of someone who is currently a TA for a class you will be given a choice to either be a TA or a student
    - When you choose TA you will be taken to a course selection page (in case you're TA'ing more than one class)
    - This will take you to the course page where you can activate the queue or leave a notification (this is not currently available but we plan to have it by the end of the quarter)
    - As a TA you can dequeue a student, which will update your queue information with the next student and their question.

## How to report a bug

- We use Github Issues for bug tracking. Follow the instructions below to report a bug:
  - Go to the Git repository. Click on the **Issues** tab. Here you can see the bug report history of the repository. Choose **New Issue** to report a new issue.
  - Fill out the report:
    - Title: a short description about the bug.
    - Body: details about the bug (e.g., what input causes the issue and how the program is not functioning as expected) so other team members can easily understand the issue and start debugging.
  - Click **Submit new issue**

## Known Bugs

- Currently a student can enqueue as many times into the same queue as they want and our backend allows that behavior
- Currently pressing the back button in our queue has undefined behavior
- Students are allowed to queue up for multiple classes at once
- Students can't exit a queue themselves, nor are they dequeued automatically

# Developer Documentation

## How to obtain the source code

- At this time, our Github project repository contains many branches that we work on to keep existing functionalities and features from breaking while we work on new ones. To use the most correct and fully functioning source code of this project, please checkout branch `main`. Typically when working on new features we split branches up according to whether it corresponds to front end, back end, db for database, etc.. To pull the source code that contains functioning, but experimental code changes to the front end, checkout branch `frontend`. Likewise, If you want source code that contains functioning, but experimental code changes to the back end, checkout branch `backend`, or for database changes checkout branch `new-docker-db`. We recommend only checking out branch `main` if you solely wish to use and play around with this project.

## The Layout of the Directory Structure

client - Contains frontend files and server for the project

- public - files needed to setup react
- src - contains the component files used for the UI and the frontend tests

reports - Contains the weekly report of the team status

server - Contains the backend files and server for the project

- src - Contains the main application logic.
  - ts - ExpressJS routes
  - The remaining files are the data types defined for the project
- test - Contains tests for the Course and Student data types

## How to build the system

### Docker

- Open docker application or install Docker using the official GUI installer from [https://www.docker.com/](https://www.docker.com/)
- Clone repo
- Make sure you are on branch `main` and the Docker GUI is running
- In root directory run the following command:
  - `docker-compose up -d --build`
  - This will essentially interpret our Docker files and execute them as explained in our docker-compose.yaml file. Within the docker-compose.yaml file we have instructions for how docker should build the images for the front end, back end, database and network that connects them together.
- That's it.

## How to test the software

- Testing is something that happens automatically during the Docker builds (explained above).
- However, if you would like to run the tests yourself the commands can be found in the .github/workflows directory in the file ci-config.yml
  - Backend: "npm test"
  - Frontend: "npm run test"

## Adding new tests

### Backend

- Navigate to server/test
- Choose testing file to add tests to (Course.test or Student.test)
- In the test files we are using the node:test module to facilitate our testing
  - Syntax, formatting, and commands can be found at: [https://nodejs.org/api/test.html](https://nodejs.org/api/test.html)
- Naming conventions are: "[name of primary function being tested] [name of subsequent functions being tested] test"

### Frontend

- Navigate to client/src/\_\_tests\_\_
- Choose existing file or create a new file with the following extension : filename.test.js
- We followed the [documentation here for test creation](https://jestjs.io/docs/getting-started)

## Building a release

1. Ensure the codebase is up to date with the latest changes and bug fixes. Make sure the current code passes the CI for build and test on github repository.
2. Make any necessary changes to the Dockerfile.
3. Ensure docker desktop is downloaded and installed.
4. Run docker-compose up -d –build to build the containers.
5. Perform some basic sanity checks to make sure the app is working properly.
6. deploy the application locally.

## Continuous Integration

We use Github Action for our CI. 

Take a look at qdub/.github/workflows/ci-config.yml for setup. 

The current config is set up so that every push to the main branch will trigger the workflows. There are two workflows: backend-unit-test and frontend-test. When these workflows are triggered they will run the build and test for the backend and frontend component. 

Check out the Actions tab on github repo to see details about the workflows. 

