//Task Rescheduling System: Managing Priorities Dynamically

let tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

//Step-2 : Remove the first task
for (let i = 0; i < tasks.length; i++) {
  tasks[i] = tasks[i + 1];
}
tasks.length--;
//step-3: Add two high-priority tasks at the beginning
// console.log(tasks.length - 1);
for (let i = tasks.length - 1; i >= 0; i--) {
  tasks[i + 2] = tasks[i];
}
tasks[0] = "Task 6";
tasks[1] = "Task 7";

//step-4: Replace the last task with a new one
tasks[tasks.length - 1] = "Task 8";
console.log("Updated Tasks:", tasks);
