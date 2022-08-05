const { initDb, end, set, get } = require('./database');

const now = new Date().toString();

initDb()
    .then(() => set('time', now))
    .then(() => get('time'))
    .then((value) => {
        if (value !== now) {
            throw new Error(`Failed to set time correctly | Expected: ${now}, Actual: ${value}`);
        }
        console.log('Successfully initialized database');
    })
    .catch(console.error)
    .finally(end);
