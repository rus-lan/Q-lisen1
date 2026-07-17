'use strict';

// In-memory task store. All data is lost on restart — this is a tutorial fixture.
// Plain JS module so the demo can `require()` it from a REPL too.

var tasks = [];
var nextId = 1;

function getAll() {
  return tasks;
}

function getOne(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      return tasks[i];
    }
  }
  return null;
}

function add(data) {
  var d = data || {};
  var t = {
    id: nextId,
    title: d.title,
    done: false,
    createdAt: new Date().toISOString()
  };
  nextId = nextId + 1;
  tasks.push(t);
  return t;
}

function patch(id, data) {
  // NOTE: no validation here on purpose — a finding for the live review.
  var t = getOne(id);
  if (!t) return null;
  if (data.title) t.title = data.title;
  if (data.done !== undefined) t.done = data.done;
  return t;
}

function reset() {
  tasks = [];
  nextId = 1;
}

module.exports = {
  tasks: tasks,
  getAll: getAll,
  getOne: getOne,
  add: add,
  patch: patch,
  reset: reset
};
