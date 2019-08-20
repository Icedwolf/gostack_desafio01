const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

let reqCount = 0;

function requestCount(req, res, next) {
  reqCount++;
  console.log(reqCount);
  next();
}

server.use(requestCount);

function checkProjectInArray(req, res, next) {
  const project = projects.find(pj => pj.id == req.params.id);
  if (!project) {
    return res.status(400).json({ error: "Project does not exists" });
  }

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;

  const project = projects.find(pj => pj.id == id);

  return res.json(project);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id: id,
    title: title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

server.put("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(pj => pj.id == id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;

  projectIndex = projects.findIndex(pj => pj.id == id);

  projects.splice(projectIndex, 1);

  // 200 response
  return res.send();
});

server.post("/projects/:id/tasks", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find(pj => pj.id == id);

  project.tasks.push(tasks);

  res.json(project);
});

server.listen(3000);
