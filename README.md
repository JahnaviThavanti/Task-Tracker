# Task-Tracker

Task Tracker is a web application that helps you manage and organize your tasks efficiently. It offers features like adding, editing, deleting, and categorizing tasks. Additionally, it supports recurring tasks, task notifications for upcoming deadlines, and a progress tracker. The app also provides a dark mode for better visual comfort in low-light conditions.

----

# Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Code](#code)
- [Challenges and Solutions](#challenges-and-solutions)
- [Contributing](#contributing)
- [License](#license)

---


# Features


## 1. **Recurring Tasks**
- Set tasks to automatically repeat on a specified schedule.
- This feature helps you manage tasks that need to be done regularly without having to re-enter them each time,Choose between daily, weekly, or monthly recurrence options.

## 2. **Task Notifications**
- Receive alerts for tasks that are due within the next 24 hours.
- This ensures you never miss an important deadline. Notifications help you stay proactive and organized.

## 3. **Task Progress Tracking**
- Visualize your productivity with a progress bar that displays the percentage of tasks completed.
- This feature gives you a clear overview of your task completion status. It helps you track your progress and stay motivated.

## 4. **Dark Mode**
- Toggle between light and dark modes for better visual comfort.
- This feature is especially useful in low-light environments. It allows you to personalize your user experience according to your preferences.

---

# Technologies Used

## Frontend

- **React**: For building user interfaces with reusable components.
- **JavaScript (ES6)**: For scripting the application's logic.
- **HTML5**: For the structure and layout of the application.
- **CSS3**: For styling and responsive design.
- **React Hooks (useState, useEffect)**: For state management and handling side effects.

## Backend

- **Node.js**: For server-side scripting and running JavaScript on the server.
- **Express.js**: For building a robust web server.
- **MongoDB**: For storing data in a flexible, JSON-like format.
- **Mongoose**: For modeling data with MongoDB.
- **RESTful API**: For handling CRUD operations.

## Additional Tools

- **npm**: For managing project dependencies.
- **Webpack**: For bundling JavaScript modules.
- **Babel**: For compiling modern JavaScript.
- **ESLint**: For identifying and fixing code issues.
- **Prettier**: For consistent code formatting.

  ---

# Setup and Installation

## Prerequisites

- Node.js (v12 or later)
- npm (Node Package Manager)

## Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-tracker.git
   cd task-tracker

2. Install dependencies:
   ```bash
   npm install
   
3. Start the development server:
   ```bash
   npm start

4. Build for Production:
   ```bash
   npm run build
   
5. Open the app in your browser at `http://localhost:3000.`

---

# Usage

### 1. Add Tasks
   - Fill in the task form and click "Add Task" to organize your tasks with titles, priorities, due dates, and categories.
### 2. Manage Tasks
   - Click a task to mark it as complete or incomplete, edit task details, or delete tasks as needed.
### 3. Recurring Tasks
   - Set tasks to repeat daily, weekly, or monthly to handle recurring duties.
### 4. Notifications
   - Get alerts for tasks due within the next 24 hours to stay on top of deadlines.
### 5. Track Progress
   - View the progress bar to see the percentage of completed tasks and stay motivated.
### 6. Dark Mode
   - Toggle between light and dark modes for a comfortable viewing experience.

---

# Code

## 1. Recurring Tasks

This feature allows users to specify recurrence patterns for tasks (e.g., daily, weekly, monthly).

To add the recurring task in the `AddTaskComponent`

      ```
      
             useEffect(() => {
        const recurringInterval = setInterval(() => {
          const now = new Date();
      
          const updatedTasks = tasks.map((task) => {
            if (task.recurring !== 'None' && new Date(task.dueDate) <= now) {
              const newDate = new Date(task.dueDate);
      
              // Update due date based on recurrence frequency
              if (task.recurring === 'Daily') newDate.setDate(newDate.getDate() + 1);
              if (task.recurring === 'Weekly') newDate.setDate(newDate.getDate() + 7);
              if (task.recurring === 'Monthly') newDate.setMonth(newDate.getMonth() + 1);
      
              return {
                ...task,
                dueDate: newDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                id: Date.now(), // Assign a new unique ID
              };
            }
            return task;
          });
      
          setTasks([...tasks, ...updatedTasks.filter((task) => task.id !== task.id)]);
        }, 24 * 60 * 60 * 1000); // Check daily
      
        return () => clearInterval(recurringInterval);
      }, [tasks]);
      
## 2.  Task Notifications

This feature notifies users about tasks that are due within the next 24 hours.

        ```
             useEffect(() => {
        const notifyInterval = setInterval(() => {
          const now = new Date();
      
          tasks.forEach((task) => {
            const dueDate = new Date(task.dueDate);
            const timeDifference = dueDate - now;
      
            if (timeDifference > 0 && timeDifference <= 24 * 60 * 60 * 1000) {
              // Notify about tasks due within the next 24 hours
              alert(Task "${task.title}" is due soon!);
            }
          });
        }, 60 * 60 * 1000); // Check every hour
      
        return () => clearInterval(notifyInterval); // Clean up interval on component unmount
      }, [tasks]);
      
## 3. Task Progress Tracking

      ```
            const calculateProgress = () => {
        const completedTasks = tasks.filter((task) => task.completed).length;
        const totalTasks = tasks.length;
        return totalTasks ? (completedTasks / totalTasks) * 100 : 0;
      };
      
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: ${calculateProgress()}% }}
          aria-label={Progress: ${calculateProgress().toFixed(2)}%}
        >
          {calculateProgress().toFixed(2)}%
        </div>
      </div>;
      
      useEffect(() => {
        console.log(Progress updated: ${calculateProgress().toFixed(2)}%);
      }, [tasks]);

  ## 4. Dark Mode

  Provides a toggle to switch between light and dark themes.

        ```
                // State to Manage Dark Mode
        const [darkMode, setDarkMode] = useState(false);
        
        // Toggle Function
        const toggleDarkMode = () => {
          setDarkMode(!darkMode);
        };
        
        // Button to Toggle Dark Mode
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        
        // Apply Theme to App
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
          {/* App Content */}
        </div>

---

# Challenges and Solutions

### Challenge 1: **Implementing Recurring Tasks**
   - **Problem:** Managing recurring tasks required additional logic to differentiate between one-time and repeating tasks, as well as handling intervals (daily, weekly, etc.).
   - **Solution:** Introduced a `recurring` field in the task data and updated the task creation form to include recurring options. A future enhancement could involve automating task regeneration based on the selected frequency.

### Challenge 2: **Task Notifications**
   - **Problem:** Ensuring timely notifications for tasks due soon was complex, particularly when comparing dates dynamically.
   - **Solution:** Used the `useEffect` hook with a periodic check (setInterval) to compare task due dates with the current date. This approach triggers alerts for tasks due within 24 hours.

### Challenge 3: **Task Progress Tracking**
   - **Problem:** Calculating and visually representing progress dynamically while tasks are added, deleted, or marked as complete was tricky.
   - **Solution:** Computed progress percentage based on completed and total tasks. Integrated a progress bar component styled dynamically using inline CSS for real-time updates.

### Challenge 4: **Dark Mode Implementation**
   - **Problem:** Toggling between light and dark modes while maintaining consistent styles across components.
   - **Solution:** Added a `darkMode` state and dynamically applied a `dark-mode` class to the root container. Used CSS to define specific styles for dark mode.

---

# Contributing

We welcome contributions to improve the Task Tracker project! 
Here is the step to contribute:

### 1. Fork the Repository
- Click "Fork" to create a copy of this repository under your GitHub account.

### 2. Clone Your Fork
- Clone the repository to your local machine:
  ```bash
      git clone https://github.com/<your-username>/task-tracker.git
    cd task-tracker

### 3. Create a Branch
- Create a branch for your changes:
  ```bash
  git checkout -b your-feature-name

### 4.Make Changes
- Add your feature or fix a bug.

### 5.Commit Your Changes
- Commit your work with a clear message
  ```bash
  git commit -m "Describe your changes"

### 6.Push and Submit
- Push your changes:
  ```bash
  git push origin your-feature-name

- Open a pull request in the original repository.
---

# Credits

- This project builds upon the Task Tracker app from the OCUFrontendWebDev repository.  
- I utilized ChatGPT to assist with code modifications and documentation enhancements.

# License

This project is licensed under the MIT License. See the [License](License) file for more details.












  



