const commands = require('./commands');

process.stdout.write('prompt > ');

process.stdin.on('data', (data) => {
    var [cmd, ...arg] = data.toString().trim().split(' ');
    if(commands[cmd]) {
        commands[cmd](arg)
    } 
    else commands.print('command not found');
})