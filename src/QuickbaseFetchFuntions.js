import { qb } from './QuickbaseTablesInfo';

function createHeaders(userToken) {
    const headers = {
        'QB-Realm-Hostname': 'masterofmemory.quickbase.com',
        'User-Agent': 'NickApp',
        'Authorization': userToken,
        'Content-Type': 'application/json'
    }
    return headers
}

function createBody(tableID) {
    return {
        "from": tableID,
        "select": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
    }
}


    
function printFields(json) { // go thru each row of fields & print  
    console.log('Fields', json.fields)
}

function camelize(str) {
    //console.log('camel')
    //const strArr = str.replaceAll(/-/g, ' ')
    const strArr = str.replaceAll(/[^\w\s]/gi, ' ')
    //console.log(strArr)
    const strArr2 = strArr.split(' ')
    //console.log(strArr2)
    const camelArr = strArr2.map((word, index) => index === 0 ? word.toLowerCase(): word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    return camelArr.join('')
}

function createFieldsJSON(fieldNames, jsonFields) {
    const newArr = fieldNames.map(fieldName => {
        return {
            name: camelize(fieldName),
            number: jsonFields.find(element => element.label.toLowerCase() === fieldName.toLowerCase()).id
        }
    })
    //console.log('createFieldsJSON: ', newArr)
    return newArr
}
// old version, only worked with vocab
function createTable(data, linksArr) {
    //console.log('creatTable')
    return data.map(element => {
        const stringedJSON = '{' +  linksArr.map(link => { return ('\"' + link.name + '\"' + ':' + '\"' + element[link.number].value.replaceAll('"', '\\\"') + '\"')}).join(', ') + '}'
        //console.log('stringedJSON: ', stringedJSON)
        const parsedJSON = JSON.parse(stringedJSON)
        
        //console.log('parsedJSON: ', parsedJSON)
        return parsedJSON
    })
}
// new improved version that differentiates btwn array & string
function createTable2(data, linksArr) {
    //console.log('creatTable')
    return data.map(element => {
        const stringedJSON = '{' +  linksArr.map(link => { return ('\"' + link.name + '\"' + ':' + null)}).join(', ') + '}'
        //console.log('stringedJSON: ', stringedJSON)
        const parsedJSON = JSON.parse(stringedJSON)
        
        //console.log('parsedJSON: ', parsedJSON)
        linksArr.forEach(link => {
            parsedJSON[link.name] = element[link.number].value
        });
        //console.log('parsedJSON2: ', parsedJSON)
        return parsedJSON
    })
}

export async function fetchAndCreateTable(userToken, tableInitInfo) {
    try {
        const res = await fetch('https://api.quickbase.com/v1/records/query',
        {
        method: 'POST',
        headers: createHeaders(userToken),
        body: JSON.stringify(createBody(tableInitInfo.id))
        })
        if(res.ok) {
            // if database is ASCII
            const buffer = await res.arrayBuffer()
            const decoder = new TextDecoder('ASCII')
            const text = decoder.decode(buffer)
            const json = JSON.parse(text)

            //console.log('json: ', json)

            printFields(json) // don't delete

            const linkedFieldsToNumsArr = createFieldsJSON(tableInitInfo.fields, json.fields)
            const tableArr = createTable2(json.data, linkedFieldsToNumsArr)
            return tableArr
        }
    } catch (err) {
        console.log(err)
    }
}

function createBodyForUpdate(tableID) {}

function createBodyForUpdateTest(tableID) {
    return {
        "to": tableID,
        "data": [
            {
                "3": { "value": "3" },
                "7": { "value": "5"}
            }
        ],
        "fieldsToReturn": [3, 6, 7, 8, 9]
    }
}

// 3: RecordID
// 6: Last Review Date
// 7: Review Interval
function createBodyForUpdateStudentExample(recordID, lastReviewDate, reviewInterval, tableID) {
    return {
        "to": tableID,
        "data": [
            {
                "3": { "value": recordID },
                "6": { "value": lastReviewDate },
                "7": { "value": reviewInterval }
            }
        ],
        "fieldsToReturn": [3, 6, 7, 8, 9]
    }
}

function createBodyForCreateStudentExample(exampleID, studentID, lastReviewDate, reviewInterval, tableID) {
    return {
        "to": tableID,
        "data": [
            {
                //"3": { "value": recordID },
                "6": { "value": lastReviewDate },
                "7": { "value": reviewInterval },
                "8": { "value": studentID },
                "9": { "value": exampleID }
            }
        ],
        "fieldsToReturn": [3, 6, 7, 8, 9]
    }
}

export async function testUpdate(userToken, tableInitInfo) {
    try {
        const res = await fetch('https://api.quickbase.com/v1/records',
        {
        method: 'POST',
        headers: createHeaders(userToken),
        body: JSON.stringify(createBodyForUpdateTest(tableInitInfo.id))
        })
        if(res.ok) {
            return res.json().then(res => console.log(res))
        }
        return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}))
    } catch (err) {
        console.log(err)
    }
}
export async function updateStudentExample(recordID, lastReviewDate, reviewInterval, userToken) {
    try {
        const res = await fetch('https://api.quickbase.com/v1/records',
        {
        method: 'POST',
        headers: createHeaders(userToken),
        body: JSON.stringify(createBodyForUpdateStudentExample(recordID, lastReviewDate, reviewInterval, qb.studentExamples.id))
        })
        if(res.ok) {
            //return res.json().then(res => console.log(res))
            return res.json().then(res => Promise.resolve(res))
        }
        return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}))
    } catch (err) {
        console.log(err)
    }
}

export async function createStudentExample(exampleID, studentID, lastReviewDate, reviewInterval, userToken) {
    try {
        const res = await fetch('https://api.quickbase.com/v1/records',
        {
        method: 'POST',
        headers: createHeaders(userToken),
        body: JSON.stringify(createBodyForCreateStudentExample(exampleID, studentID, lastReviewDate, reviewInterval, qb.studentExamples.id))
        })
        if(res.ok) {
            //return res.json().then(res => console.log(res))
            return res.json().then(res => Promise.resolve(res))
        }
        return res.json().then(resBody => Promise.reject({status: res.status, ...resBody}))
    } catch (err) {
        console.log(err)
    }
}