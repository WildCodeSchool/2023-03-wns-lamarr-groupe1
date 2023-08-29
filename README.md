Mise en place de Piston :

docker compose up --build 

cd piston
cd cli
npm i

windows :
node ./cli/index.js ppman list
node ./cli/index.js install node

Linux / mac (?) :
cli/index.js ppman list
cli/index.js ppman install node

Postman:
GET http://localhost:2000/api/v2/runtimes 
doit retourner : 
[
    {
        "language": "javascript",
        "version": "18.15.0",
        "aliases": [
            "node-javascript",
            "node-js",
            "javascript",
            "js"
        ],
        "runtime": "node"
    }
]

POST http://localhost:2000/api/v2/execute 
Body:
{
    "language": "javascript",
    "version": "18.15.0",
    "files": [
        {
            "name": "my_cool_code.js",
            "content": "console.log('coucou')"
        }
    ],
    "stdin": "",
    "args": ["1", "2", "3"],
    "compile_timeout": 10000,
    "run_timeout": 3000,
    "compile_memory_limit": -1,
    "run_memory_limit": -1
}

 doit retourner :
{
    "run": {
        "stdout": "coucou\n",
        "stderr": "",
        "code": 0,
        "signal": null,
        "output": "coucou\n"
    },
    "language": "javascript",
    "version": "18.15.0"
}
