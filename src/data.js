export const TODO_TASKS = [
  {
    id: crypto.randomUUID(),
    title: "Implement Drag and Drop for Trello Cards",

    subtasks: [],
  },
  {
    id: crypto.randomUUID(),
    title: "Refactor Components for Reusability",
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Integrate Redux for State Management",
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: "Create vite application",
        completed: false,
      },
    ],
  },
];

export const IN_PROGRESS_TASKS = [
  {
    id: crypto.randomUUID(),
    title: "Create Trello Frontend",
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: "Create vite application",
        completed: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Design data flow between components",
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Setup Context to avoid Prop drilling",
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
];

export const DONE_TASKS = [
  {
    id: crypto.randomUUID(),
    title: "Setup Initial Project Structure",
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Create Reusable Button Component",
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: "Create vite application",
        completed: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Configure Webpack and Babel for Development",
    subtasks: [
      {
        id: crypto.randomUUID(),
        title: "Create vite application",
        completed: true,
      },
    ],
  },
];

export const TASKBOARDS = [];

// {
//   id: crypto.randomUUID(),
//   heading: "To do",
//   todos: TODO_TASKS || [],
// },
// {
//   id: crypto.randomUUID(),
//   heading: "In Progress",
//   todos: IN_PROGRESS_TASKS || [],
// },
// {
//   id: crypto.randomUUID(),
//   heading: "Done",
//   todos: DONE_TASKS || [],
// },
