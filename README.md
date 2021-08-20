# REST API Time Tracker

The REST API to the example app is described below.

### Setup
```bash
    git clone https://github.com/sonnemon/api-time-tracker.git
    cd api-time-tracker
    npm install
    npm run dev
```

### Test
```bash
    npm run test
```


### Base URL
`http://localhost:3000`


### Variables
`project_name(string): project's name`


### Request Open project
`PUT /project/open/{project_name}`
#### Response
```json
    {
        "name": "projecto_2",
        "totalTime": 3,
        "currentStatus": "OPEN",
        "segments": [
            {
            "dateClose": "2021-08-18 19:34:37",
            "spendTime": 3
            }
        ]
    }
```

### Request Close project
`PUT /project/close/{project_name}`
#### Response
```json
    {
        "name": "projecto_2",
        "totalTime": 3,
        "currentStatus": "CLOSE",
        "segments": [
            {
            "dateClose": "2021-08-18 19:34:37",
            "spendTime": 3
            }
        ]
    }
```


### Request get all close projects
`GET /project`
#### Response
```json
    [
        {
            "name": "projecto_1",
            "totalTime": 14,
            "currentStatus": "CLOSE"
        },
        ...
    ]
```


### Request get one project
`GET /project/{project_name}`
#### Response
```json
    {
        "name": "projecto_1",
        "totalTime": 14,
        "currentStatus": "CLOSE",
        "segments": [
            {
                "dateClose": "2021-08-18 18:46:47",
                "spendTime": 12
            },
            {
                "dateClose": "2021-08-18 19:17:02",
                "spendTime": 2
            }
        ]
    }
```
