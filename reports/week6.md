# **Team Report**

## Last Week Goals

- ~~Do week 6 weekly report~~
- Combined Alpha Prototype Working
- ~~Finish~~ [~~Testing and CI~~](https://homes.cs.washington.edu/~rjust/courses/CSE403/project/05_ci_testing.html) ~~by Tuesday~~
- ~~Finish CSS/React prototype by Thursday~~
- Interview TA's

## Progress and Issues

### What we did

- Finished the prototype
- Made a lot of important decisions about how the application will work. Specifically, simplified further.
- Communicated a lot to make sure we're on the same page
- Created a plan moving forward
- Conducted/arranged interviews with TA's

### What worked

- Group communication was solid
- Once we had a good understanding of what to do, we did it well

### What we learned

- When working as a team, it's important to have a good understanding of what we're doing
- AWS is more difficult to use than expected; pretty much everything is more complicated than it seems

### Where we had trouble

- Figuring out what we need to do next
- We weren't all on the same page about how the mock database should work

##


## Next Week Goals

- Interview TA's
- Get mock data tables set up in db
- Connect more front end pieces to backend functionality
- Automate deployment

# **Individual contributions**

## Wendi

### What I did

- Helped brainstorm on the flow of the actual product
- Display and set up auto update of queue information for frontend

### What worked

- Working together on finalizing the prototype

### What I learned

- How to use setInterval to update information on webpage
- How to get information from api

### Where I had trouble

- Populating a dropdown list with a given list of courses

## Izzy

### What I did

- Helped front end set & initialize variables that can be used across multiple components (will be necessary for student IDs)
- Helped set up docker configs to run sql files upon initialization of database image (to create tables and fill tables with data upon initial spin up)

### What worked

- Working with my teammates and asking them questions
- Asking Google

### What I learned

- Passing data around in React is an art form
- It's hard to get something done when you don't know exactly what you need to do

### Where I had trouble

- Breaking down my tasks into smaller action items

## Tri

### What I did

- Write unit tests for the new implementation of our back-end code
- Help set up docker container for our database component
- Look into integration test

### What worked

- All docker containers are up and running

### What we learned

- Docker is amazing

### Where we had trouble

- I had some trouble configuring the docker files to enable communication between backend and frontend but Pasha fixed it.

## Jared

### What I did

- Tried to deploy our images to ECS and have it running using Amazon's services.

### What worked

- We got the images tagged and registered in an ECR

### What I learned

- I learned the process of getting docker images created and sent to ECR

### Where I had trouble

- I had trouble getting the ECS to create a valid task that ran the images that were in the ECR. I believe it has something to do with the ports or that the images were not tagged correctly.

## Pasha

### What I did

- Created a new branch for deployment and merged the frontend and backend
- Met with both frontend and backend teams to finalize prototype
- Debugged async frontend issues
- Debugged ACS deployment configuration
- Fixed Docker container to allow communication between frontend and backend
- Wrote some frontend tests

### What worked

- The team worked well together
- Debugging has been effective and productive

### What I learned

- Trying to keep the big picture in mind is very challenging after you get into the minute details of a project
-

### Where I had trouble

- Keeping track of what needs to be done
- I wasn't on the same page with other members of the group about how our mock database should work