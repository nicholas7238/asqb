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

            //printFields(json) // don't delete

            const linkedFieldsToNumsArr = createFieldsJSON(tableInitInfo.fields, json.fields)
            const tableArr = createTable2(json.data, linkedFieldsToNumsArr)
            return tableArr
        }
    } catch (err) {
        console.log(err)
    }
}