const MathUtils = require('./math');

class App {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    run() {
        const sum = MathUtils.add(this.a, this.b);
        const difference = MathUtils.subtract(this.a, this.b); 
        console.log(`Daryan: ${this.a} + ${this.b} = ${sum}, ${this.a} - ${this.b} = ${difference}`);
    }
}

new App(10, 4).run();
