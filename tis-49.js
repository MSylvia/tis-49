var T21 = {
  _r: { ACC: 0, BAK: 0, NIL: 0, PC: 0 },
  _p: { LEFT: null, RIGHT: null, UP: null, DOWN: null, LAST: null },

  execute: function (program) {
    T21._r.PC = 0;
    // while (true) {
      var line = program[T21._r.PC++];
      line = line.split(" "); // TODO: more generous with formatting (extra whitespace)
      T21[line[0]].apply(this, line);

      // if (T21._r.PC >= program.length) T21._r.PC = 0;
    // }
  },

  NOP: function () {
    _checkArguments(arguments, 1);

    T21.ADD(T21._r.NIL);
  },

  MOV: function () {
    _checkArguments(arguments, 3);

  },

  SWP: function () {
    _checkArguments(arguments, 1);

    var temp = T21._r.BAK;
    T21._r.BAK = T21._r.ACC;
    T21._r.ACC = temp;
  },

  SAV: function () {
    _checkArguments(arguments, 1);

    T21._r.BAK = T21._r.ACC;
  },

  ADD: function () {
    _checkArguments(arguments, 2);

  },

  SUB: function () {
    _checkArguments(arguments, 2);

  },

  NEG: function () {
    _checkArguments(arguments, 1);

    T21._r.ACC *= -1;
  },

  JMP: function () {
    _checkArguments(arguments, 2);

  },

  JEZ: function () {
    _checkArguments(arguments, 2);

  },

  JNZ: function () {
    _checkArguments(arguments, 2);

  },

  JGZ: function () {
    _checkArguments(arguments, 2);

  },

  JLZ: function () {
    _checkArguments(arguments, 2);

  },

  JRO: function () {
    _checkArguments(arguments, 2);

  },

  _checkArguments: function (arguments, count) {
    if (arguments.length != count) throw T21._r.PC;
  }
};