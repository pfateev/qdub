# Q'ed Up
### What is Q'ed Up?
A priority queueing web application made by UW students in CSE 403 with the ambition to make office hours more systematic & straightforward.
#### Goals of this project:
- Have a working priority queue that supports necessary queue functionality
  - for example: enqueue, dequeue, change priority, etc.
- Support login authentication through UW NetID
- Differentiate between students and faculty in order to show the corresponding UI & give correct permissions
  - for example: UI for faculty will have functionality to see the queue, manually edit the queue & broadcast messages to everyone on the queue. Student UI will not be able to see the queue but see a time estimation.

### Notes for Devs
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

