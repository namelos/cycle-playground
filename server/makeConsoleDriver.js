module.exports = () =>
        msg$ =>
        msg$.subscribe(console.log)
