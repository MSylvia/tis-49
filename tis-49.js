var T21 = {
  _regs: { ACC: 0, BAK: 0, NIL: 0, PC: 0 },
  _ports: { LEFT: null, RIGHT: null, UP: null, DOWN: null, LAST: null },
  _labels: {},
  _program: undefined,

  load: function (program) {
    this._resetProgram();
    if (!program) return;

    this._program = [];
    for (var i = 0; i < program.length; ++i) {
      var line = program[i].trim().toUpperCase();

      if (line[line.length - 1] === ':') { // entire line is label
        this._labels[line.substr(0, line.length - 1)] = i;
      } else if (false) { // TODO: prefixed with label

      } else {
        this._program.push(line);
      }
    }
  },

  step: function () {
    if (!this._program || this._program.length == 0) return;

    var line = this._program[this._regs.PC++];
    line = line.split(" "); // TODO: more generous with formatting (extra whitespace)
    this[line[0]].apply(this, line);

    if (this._regs.PC >= this._program.length) this._regs.PC = 0;
  },

  NOP: function () {
    this._checkArguments(arguments, 1);

    this.ADD(this._regs.NIL);
  },

  MOV: function () {
    this._checkArguments(arguments, 3);

  },

  SWP: function () {
    this._checkArguments(arguments, 1);

    var temp = this._regs.BAK;
    this._regs.BAK = this._regs.ACC;
    this._regs.ACC = temp;
  },

  SAV: function () {
    this._checkArguments(arguments, 1);

    this._regs.BAK = this._regs.ACC;
  },

  ADD: function () {
    this._checkArguments(arguments, 2);
    var src = this._checkSrc(arguments);
    if (src === null) this._regs.PC--;
    else {
      if (this._regs[src] !== undefined) this._regs.ACC += this._regs[src];
      else if (this._ports[src] !== undefined) this._regs.ACC += this._ports[src];
      else {
        this._regs.ACC += +src;
      }
    }
  },

  SUB: function () {
    this._checkArguments(arguments, 2);
    var src = this._checkSrc(arguments);
    if (src === null) this._regs.PC--;
    else {
      if (this._regs[src] !== undefined) this._regs.ACC -= this._regs[src];
      else if (this._ports[src] !== undefined) this._regs.ACC -= this._ports[src];
      else {
        this._regs.ACC -= +src;
      }
    }
  },

  NEG: function () {
    this._checkArguments(arguments, 1);

    this._regs.ACC *= -1;
  },

  JMP: function () {
    this._checkArguments(arguments, 2);
    var label = this._checkLabel(arguments);

    this._regs.PC = this._labels[label];
  },

  JEZ: function () {
    this._checkArguments(arguments, 2);
    var label = this._checkLabel(arguments);

    if (this._regs.ACC === 0) {
      this._regs.PC = this._labels[label];
    }
  },

  JNZ: function () {
    this._checkArguments(arguments, 2);
    var label = this._checkLabel(arguments);

    if (this._regs.ACC !== 0) {
      this._regs.PC = this._labels[label];
    }
  },

  JGZ: function () {
    this._checkArguments(arguments, 2);
    var label = this._checkLabel(arguments);

    if (this._regs.ACC > 0) {
      this._regs.PC = this._labels[label];
    }
  },

  JLZ: function () {
    this._checkArguments(arguments, 2);
    var label = this._checkLabel(arguments);

    if (this._regs.ACC < 0) {
      this._regs.PC = this._labels[label];
    }
  },

  JRO: function () {
    this._checkArguments(arguments, 2);

  },

  _checkArguments: function (arguments, count) {
    if (arguments.length != count) throw this._regs.PC;
  },

  _checkSrc: function (arguments) {
    var src = arguments[1];
    if (isNaN(src)
        && this._ports[src] === undefined
        && this._regs[src] === undefined
        && src !== 'BAK') throw this._regs.PC;
    return src;
  },

  _checkLabel: function (arguments) {
    var label = arguments[1];
    if (this._labels[label] === undefined) throw this._regs.PC;
    return label;
  },

  _resetProgram: function () {
    this._program = undefined;
    this._labels = {};
  }
};