const makeConsoleDriver = () =>
        msg$ =>
        msg$.subscribe(console.log)

module.exports = makeConsoleDriver
