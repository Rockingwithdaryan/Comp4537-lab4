const messages = require('../lang/en/en.json');

class Utils {
    static getDate() {
        return new Date().toString();
    }

    static format(template, ...args) {
        return args.reduce((str, arg, i) => str.replace(`%${i + 1}`, arg), template);
    }

    static escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    static getGreeting(name) {
        const greeting = Utils.format(messages.greeting, Utils.escapeHtml(name));
        return `<p style="color: blue;">${greeting} ${Utils.getDate()}</p>`;
    }
}

module.exports = Utils;
