var fs = require('fs');
const { request } = require('http');

function print(input) {
    process.stdout.write(input + '\n');
    process.stdout.write('prompt > ');
};

function date() {
    print(Date());
};

function pwd() {
    print(process.mainModule.path)
};

function ls() {
    fs.readdir('.', (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          process.stdout.write(file.toString() + "\n");
        })
        process.stdout.write("prompt > ");
      });
};

function echo(arg) {
    print(arg.join(' '))
};

function cat(arg) {
    fs.readFile(arg.at(0), 'utf-8', (err, files) => {
        if(err) throw err;
        print(files); 
    })
};

function head(arg) {
    fs.readFile(arg.at(0), 'utf-8', (err, files) => {
        if(err) throw err;
        print(files.split('\n').splice(0, 5).join('\n'));
    })
};

function tail(arg) {
    fs.readFile(arg.at(0), 'utf-8', (err, files) => {
        if(err) throw err;
        print(files.split('\n').splice(-5).join('\n'));
    })
};

function curl(arg) {
    request(arg[0], (err, data) => {
        if(err) throw err;
        print(data.body)
    })
};

module.exports = {
    print,
    date,
    pwd,
    ls,
    echo,
    cat,
    head,
    tail,
    curl
}