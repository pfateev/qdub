# Q'ed Up
## What is Q'ed Up?
A priority queueing web application made by UW students in CSE 403 with the ambition to make office hours more systematic & straightforward.
#### Goals of this project:
- Have a working priority queue that supports necessary queue functionality
  - for example: enqueue, dequeue, change priority, etc.
- Support login authentication through UW NetID
- Differentiate between students and faculty in order to show the corresponding UI & give correct permissions
  - for example: UI for faculty will have functionality to see the queue, manually edit the queue & broadcast messages to everyone on the queue. Student UI will not be able to see the queue but see a time estimation.

#### Layout of Repository
##### server
- Contains the back-end files and server for the project
##### client
- Contains the frond-end files and server for the project
##### reports
- Contains the weekly reports

#### Running the project:
##### Docker
- Install Docker using the official GUI installer from https://www.docker.com/
- Clone repo
- Make sure you are on the main branch and the Docker GUI is running
- In root directory run the following command:
  - docker-compose up --build
    - For building the project the first time
- In the Docker GUI click on the qdub container and click the port link 3000:3000
  - You may also navigate in your browser to http://localhost:3000/

##### Using the application
- Currently only two usernames will be accepted
  - "ta"
    - will show TA view of the current queue (pre-populated with students)
    - can dequeue using the "finished" button
  - "student"
    - logging in as this username will add another student to the queue and update the state

##### Shutting down
- You can use the following command : docker-compose down OR shut down the application in the Docker GUI

### Version Control:

Our repository is hosted on github and all of the version control will be done with git. All final changes can be seen in "main". For the prototype, we have bundled all the changes in frontend and backend into the branch "alpha-fullstack". This branch also includes all of the Automated Testing and CI components. Typically, for the latest changes in the frontend, we would need to navigate to the "frontend" branch. The backend's latest changes are in "ts-setup". Finally, any database changes can be found in "docker-db".

### Bug Tracking:

To keep track of bugs, we've decided to utilize Github's built in "Issues" feature. We found this to be optimal because we can directly reference teammates, pull requests, other issues or discussions. To add a new Issue simply click on the "Issues" tab above & press "New issue." On the prior page you can also see all open & closed issues.

### Testing & CI:

Test: To run tests locally, follow instructions below:

1. Backend:

- If you have not built the backend server follow the instructions above
- Run command: **npm test** to run back end tests

1. Frontend:

- If you have not built the backend server follow the instructions above
- Run command: **npm run test** to run back end tests

CI: We use Github Action for our CI.

Take a look at `qdub/.github/workflows/ci-config.yml` for setup.

The current config is set up so that every push to the main branch will trigger the workflows. There are two workflows: backend-unit-test and frontend-test. When these workflows are triggered they will run the build and test for the backend and frontend component.

Check out the Actions tab on github repo to see details about the workflows.

## (For Demo)

## Reflecting on use cases that are operational & touch all major components of our system:

1. A student wants to add themselves to the queue.
2. A TA for the course queue wants to sign in and manage the queue.
- Upon opening our application, all users will be prompted with a registration page. The user will then fill out the registration process & click confirm, which triggers a request to the backend server with the information that the user supplied. The application will then route to either 1 of 2 pages, depending on if the user is a TA or a Student.
3. The TA is done helping a student and ready to move onto the next student.
- After a TA has logged in, they will be rerouted to the TA page, where they can see queue information sent from the backend in set intervals and also manage the queue with the ability to trigger the "Next Student" operation button which sends a request to the backend to dequeue the next student.

To test if it works:
1. Uncomment lines 18-28 in server/configs/pgConfigs.js
2. Run `node server/configs/pgConfigs.js`
Your terminal should log something like:
``` Result {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows: [ { verification: 2 } ],
  fields: [
    Field {
      name: 'verification',
      tableID: 0,
      columnID: 0,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: 'text'
    }
  ],
  _parsers: [ [Function: parseInteger] ],
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object],
      builtins: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false
}
```