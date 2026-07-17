'use strict';

// Legacy helpers left over from an earlier prototype.
// Not imported by the server. Kept here as review material for the
// opencode course demo — a realistic target for a "clean this up" task.

function proc(d) {
  var x = d;
  if (x == null) {
    return null;
  }
  var r = {};
  r.id = x.id;
  r.n = x.name;
  r.s = x.status ? x.status : 'new';
  return r;
}

function proc2(d) {
  var x = d;
  if (x == null) {
    return null;
  }
  var r = {};
  r.id = x.id;
  r.n = x.name;
  r.s = x.status ? x.status : 'new';
  r.t = new Date().getTime();
  return r;
}

module.exports = {
  proc: proc,
  proc2: proc2
};
