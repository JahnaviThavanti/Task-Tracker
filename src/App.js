import React, { useState, useEffect } from 'react';

// AddTaskForm Component
function AddTaskForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium',
    dueDate: '',
    category: 'Work',
    recurring: 'None',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onAdd(formData);

    setFormData({
      title: '',
      priority: 'Medium',
      dueDate: '',
      category: 'Work',
      recurring: 'None',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <div className="form-group">
        <label htmlFor="title">Task Title: <span className="required">*</span></label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority Level:</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date:</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="recurring">Recurring:</label>
        <select
          id="recurring"
          name="recurring"
          value={formData.recurring}
          onChange={handleChange}
        >
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

// TaskItem Component
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''}`}
      onClick={onToggle}
    >
      <h3>{task.title}</h3>
      <p>Priority: {task.priority}</p>
      {task.dueDate && <p>Due Date: {task.dueDate}</p>}
      <p>Category: {task.category}</p>
      <p>Recurring: {task.recurring}</p>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
    </div>
  );
}

// App Component
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const notifyInterval = setInterval(() => {
      tasks.forEach((task) => {
        if (new Date(task.dueDate) - new Date() <= 24 * 60 * 60 * 1000) {
          alert(`Task "${task.title}" is due soon!`);
        }
      });
    }, 60 * 60 * 1000); // Check hourly

    return () => clearInterval(notifyInterval);
  }, [tasks]);

  useEffect(() => {
    const recurringInterval = setInterval(() => {
      tasks.forEach((task) => {
        if (task.recurring !== 'None' && new Date(task.dueDate) <= new Date()) {
          const newDate = new Date(task.dueDate);
          if (task.recurring === 'Daily') newDate.setDate(newDate.getDate() + 1);
          if (task.recurring === 'Weekly') newDate.setDate(newDate.getDate() + 7);
          if (task.recurring === 'Monthly') newDate.setMonth(newDate.getMonth() + 1);

          addTask({ ...task, id: tasks.length + 1, dueDate: newDate.toISOString().split('T')[0] });
        }
      });
    }, 24 * 60 * 60 * 1000); // Check daily

    return () => clearInterval(recurringInterval);
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: tasks.length + 1, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Task Tracker</h1>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <AddTaskForm onAdd={addTask} />
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          {progress.toFixed(2)}%
        </div>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
