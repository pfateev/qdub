# **Team Report**

## Last Week Goals

- Docker is setup for the entire project
- CSS/React finish prototype
  - ~~Adding all of the prototype views~~
  - CSS fixes from the automatic Figma → React conversion (forms, buttons, checkboxes, etc)
- ~~Basic queueing functionality~~
- ~~Finish~~ [~~architecture and design assignment~~](https://homes.cs.washington.edu/~rjust/courses/CSE403/project/04_design.html) ~~due TUESDAY~~
- Do week 5 report

## Progress and Issues

### What we did

- Simplified application design to only support current OH experience
- Restructured team for the week to give more attention to getting a prototype version deployed
- **Frontend**
  - Transferred all Figma designs into React
  - Fixed CSS in the RegistrationForm, and StudentView
  - Added state
- **Backend**
  - Implemented our own simple version of doubly-linked-list instead of using the library
    - We had issues with generics – we couldn't use our custom types. This led to the realization that our use case is very simple so we don't need a robust solution (at least not yet)
  - High level design of API routes

### What worked

- Splitting up tasks & working asynchronously on some tasks to ensure we aren't wasting time when we meet as a group.
- Simplifying the application lets you see results faster, which makes it easier to see the bigger picture
- Maximizing productivity by exploiting git (version control)! Working on different branches, pulling each other's changes, etc, helps us split up tasks.

### What we learned

- Even a simple idea can get really complex really fast
- Organizing a group and splitting tasks efficiently in a way that maximizes productivity is challenging
- Communication is key for progress in the right direction, keeping each other updated on what is done, not done, what's not working, tasks currently working on etc.

### Where we had trouble

- Figuring out the schedule for the rest of the project is still a daunting task
- Using a 3rd party library is very enticing because it comes preloaded with a ton of functionality but it comes at a cost of unexpected compatibility issues.
  - In our case it led to having to implement our own version anyway

## Next Week Goals

- Do week 6 weekly report
- Combined Alpha Prototype Working
- Finish [Testing and CI](https://homes.cs.washington.edu/~rjust/courses/CSE403/project/05_ci_testing.html) by Tuesday
- Finish CSS/React prototype by Thursday
- Interview TA's

# **Individual contributions**

## Wendi

### What I did

- Fixed and cleaned up frontend code for registration and student view
- Helped set up connections with frontend and backend
- Helped fill out the frontend portion of "Software Design" in the Architecture & Design assignment

### What worked

- Working together with other members on specific tasks can make the process more efficient and productive

### What I learned

- Git can be tricky to use, so asking for clarification is important
- How to more effectively use flex and grid in CSS

### Where I had trouble

- Figuring out how to push and pull from git without messing up the whole repository
- Getting started with using react components because it can get confusing at times.

## Izzy

### What I did

- Figure out how to set up, log it & use pgAdmin (Postgres GUI) with docker.
- Help set up routes for frontend to change UI page when student enqueues, dequeues, etc.
- Fill out "coding guidelines" portion of architecture & design document
- Fill out first 2 "risk assessment" parts from architecture & design document
- Fill out "Project Schedule" portion of architecture & design document
- Read over & give feedback for other portions of architecture & design document

### What worked

- Asking my teammates for help when something in the frontend was not working as intended. It helped me vocalize the problem & get more experienced input to ultimately fix the problem.
- Splitting big tasks into many smaller tasks makes large, unambiguous tasks more realistic, tangible & gives more insight to how much time it will take to complete.

### What I learned

- React is confusing.
- Javascript is confusing.
- Asking for help & clarification is good.
- Communication is key to success.

### Where I had trouble

- Determining the best way to be efficient to complete my tasks and my team. Focusing on databases was not a priority at this time and the trouble came because I should have helped focus on other aspects of the project first.
- Understanding error messages from frontend can be very unambiguous & don't give a lot of insight into what exactly is wrong.

## Tri

### What I did

- Implemented some methods for the backend implementation
- Learned how to write unit tests using mocha and chai library in Typescript and wrote tests.
- Looking up on how to set up Docker to deploy our prototype
- Contributed to Architecture & Design assignment ( some risk assessment and testing plan)

### What worked

- Mocha and Chai are great for unit testing

### What we learned

- Using already implemented data structure in TS comes with some complications.
- It is better to simplify the functionalities of the application and make those functionalities perform correctly first before overloading the application with many functionalities.

### Where we had trouble

- The Dbly-LinkedList library we used did not work well for our application so we had to implement our own version of double linked list.
- The backend server does not run when I run docker-compose yet.

## Jared

### What I did

- Implemented the queue and student class using the dbly-linked-list package. However, we had to scrap this since it was impossible to replace the data type for the node of this dbly linked-list
- I implemented our own doubly linked list and created the basic functions of the queue and students

### What worked

- The specialized doubly linked list worked much better as we were able to access the methods in student and have the nodes contain student objects.

### What I learned

- I learned the difference between class and module.
- I also learned how to cast objects in typescript

### Where I had trouble

- I had a lot of trouble with accessing the fields and functions of the student class in the queue. The reason being is that the students had yet to be instantiated but I wanted to write a queue class that had functions where the queue already had students in it.

## Pasha

### What I did

- Facilitated group meetings
- Wrote specifications for frontend and backend teams that provides a detailed instruction on what is needed in order to complete the prototype
- Assessed current progress and suggested simplifying the project in order to get a Beta version deployed in time
- Checked in with individual team members to make sure everyone was happy with their current roles
- Setup a basic React component that serves as a starting point for the other views
- Designed high level api routes for the prototype

### What worked

- Team meetings/discussions went really well. We were able to reach consensus and organize efficiently.
- After simplifying our design, coding became easier

### What I learned

- Less is more. Starting really simple and getting a working version of your idea is better than trying to plan out every little detail.
- REST API best practices
- I got laser-focused on what I was working on with the frontend and forgot the bigger picture

### Where I had trouble

- Still struggling with scheduling the remaining work
- We have a few big question marks in regards to deployment and Docker