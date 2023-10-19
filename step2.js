const fs = require('fs');
const axios = require('axios')

function handleInput(path) {
    if (path.startsWith('http://') || path.startsWith('https://')) {
        webCat(path);
    }
    else {
        cat(path);
    }
}

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err){
            console.log(`Error fetching "${path}":`);
            console.log('Error: Request failed with status code 404')
            process.exit(404);
        }
        console.log(data);
    })
}

function webCat(path) {
    if (path.startsWith('http://') || path.startsWith('https://')) {
        const data = axios.get(path).then(function(resp) {
            console.log(resp.data)
        });
        
    }
    else {
        cat(process.argv[2])
    }
}

handleInput(process.argv[2])