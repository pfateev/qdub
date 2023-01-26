# Team Report


## Last Week Goals

- Finish architecture and design assignment by Sunday
- Add README to repo
- Add bookmark of repo in Slack
- Want to figure out what information NetID will give us access to
- Ask about Azure credits for connecting to NetID


## Progress and Issues


### What we did

We chose to spend most of our time prototyping this week because we hadn’t gone over the material yet for architecture and design and wanted to maximize the time we had. This gave us a much better understanding of what our final version might look like and things to consider for the future.

- **Prototype**

  - _Implementation_

    - Front-end server setup
    - Back-end server setup
    - Database setup
    - Connecting all of these components

  - _Design_

    - Identified the most fundamental/important components of our project that we can realistically build in a short amount of time
    - Lots of discussion led to good questions

-   


### What worked

- Referencing examples online to learn more about relevant technologies ex: docker, React

- Group meetings were productive and highly collaborative

- Utilizing Jared’s original Figma design allowed us to save a lot of time prototyping

  - Figma to React code conversion function were also helpful

- Splitting up the work into teams was really fluid and people were naturally able to fall into the areas they’re most interested in


### What we learned

- We don’t all need to be working on everything as a group synchronously
- Docker basics and the necessity of having a controlled environment to develop in
- Basics/refresher of React, JS/TS
- There are a lot of examples of exactly what we need online and it’s important to not reinvent the wheel


### Where we had trouble

- Coordinating meeting setup with all the different tools: Zoom, Slack, reserve.cs.washington, Google Calendar

- Syncing up everyone’s setup to run the project

  - Everyone has a different version of npm, Node etc.

- The database is our weakest point right now, we’re struggling with designing how the data will be stored


## Next Week Goals

- Docker is setup for the entire project

- CSS/React finish prototype

  - Adding all of the prototype views
  - CSS fixes from the automatic Figma → React conversion (forms, buttons, checkboxes, etc)

- Basic queueing functionality

- Finish[architecture and design assignment](https://homes.cs.washington.edu/~rjust/courses/CSE403/project/04_design.html)due TUESDAY

- Do week 5 report


# Individual contributions


## Wendi


### What I did

- Help create an ER diagram for our prototype
- Brainstormed ideas for front-end prototype
- Made Figma of front-end prototype


### What worked

- Converting Figma to basic react


### What I learned

- Getting re-familiarized with react


### Where I had trouble

- Getting the front-end server to run on my laptop


## Izzy


### What I did

- Setup docker image for postgres database

  - Testing that we could connect to database from the backend

- Updated README with general info needed for the github setup assignment


### What worked

- Testing things right away
- Looking at examples online


### What I learned

- Docker is a complicated concept to learn, but very useful & efficient for projects like this because it saves us time & effort in the long run.
- Google is my best friend


### Where I had trouble

- Connecting the backend to the database (i was using the wrong ports).


## Tri


### What I did

- Watch Pasha set up back end server


- Set up the Node js with typescript
- Outlined structure for Student, Queue, Course object.
- Implementing those objects above.
- Review teammates' work.


### What worked

- Back end server is live..
- Typescript set up is working


### What we learned

- How to set up a back end server using Node JS
- How to set up Node JS with typescript
- How to modify the tsconfig.json file to change configuration of the typescript compiler.


### Where we had trouble

- Setting up Node JS was quite tricky, and I’m not entirely sure it is correctly set up yet.


## Jared


### What I did

- Watch Pasha set up back end server
- Reviewed teammates input on Git Setup
- Relearned Typescript
- Outlined basic queue, course, and student classes
- Brainstormed database design and er diagram


### What worked

- Successfully set up Typescript compiling for the project


### What I learned

- I learned how Typescript converts to javascript and how our program will compile typescript files


### Where I had trouble

- Difficulty with creating classes in TypeScript


## Pasha


### What I did

- Setup backend and front end server and the connection between them
- Made the github repo
- Worked on frontend prototype design
- Facilitated group meetings


### What worked

- Good group dynamics

  - Everyone taking responsibility for their pieces of the project
  - Having fun
  - Collaboration during working sessions

- Prototyping was a really good idea

- Suggesting we make the prototype in JS/TS instead of Java saved us some time and setup


### What I learned

- Anything you plan at this stage will most likely change (which it did)

  - Prototyping

    - I’m usually hesitant to jump directly into code and have a tendency to want to plan every little detail, but I realized that prototyping first, makes planning much easier because you have a better understanding of the project

- Setting good goals is really important in order to make meaningful progress


### Where I had trouble

- Juggling workload between classes

  - Not spending as much time as I would like on this project
  - Difficult managing all the necessary projects

- Git repo

  - Created a merge conflict entirely by myself and had to spend time bringing the repo back to a healthy state
