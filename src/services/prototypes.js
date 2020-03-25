export Array.prototype.sum = function() {return this.length > 0 ? this.reduce((acc, num) => acc + num) : 0};
export Object.prototype.toArray = function() { return Object.values(this);};

