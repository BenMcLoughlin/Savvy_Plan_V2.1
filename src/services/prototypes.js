Array.prototype.sum = function() {return this.length > 0 ? this.reduce((acc, num) => acc + num) : 0};
Array.prototype.filterAll = function(name, ...args) {console.log(args.map(arg => this.filter( d => d[name] === arg)))};
Object.prototype.toArray = function() { return Object.values(this);};

Object.defineProperty(Array.prototype.sum = function() {return this.length > 0 ? this.reduce((acc, num) => acc + num) : 0});