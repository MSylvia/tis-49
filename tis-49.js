var T21 = {
  _r: { ACC: 0, BAK: 0, NIL: 0, PC: 0 },
  _p: { LEFT: null, RIGHT: null, UP: null, DOWN: null, LAST: null },

  NOP: function () {
    T21.ADD(T21._r.NIL);
  },

  MOV: function (src, dst) {

  },

  SWP: function () {
    var temp = T21._r.BAK;
    T21._r.BAK = T21._r.ACC;
    T21._r.ACC = temp;
  },

  SAV: function () {
    T21._r.BAK = T21._r.ACC;
  },

  ADD: function (src) {

  },

  SUB: function (src) {

  },

  NEG: function () {
    T21._r.ACC *= -1;
  },

  JMP: function (label) {

  },

  JEZ: function (label) {

  },

  JNZ: function (label) {

  },

  JGZ: function (label) {

  },

  JLZ: function (label) {

  },

  JRO: function (src) {

  }
};