const Promise = require('bluebird');

function spawn(machine) {
    const generator = machine();
    return new Promise((resolve, reject) => {
        try {
            spawn_(resolve, generator, generator.next())
        } catch( ex ) {
            reject(ex);
        }
    });

    function spawn_(resolver, machine, step) {
        if( step.done ) {
            if( step.value && step.value.then ) {
                step.value.then(value => resolver(value));
            } else {
                resolver(step.value);
            }
        } else {
            if( step.value  && step.value.then ) {
                step.value.then(value => spawn_(resolver, machine, machine.next(value)));
            } else {
                process.nextTick(() => spawn_(resolver, machine, machine.next(step.value)));
            }
        }
    }
}

module.exports = spawn;
