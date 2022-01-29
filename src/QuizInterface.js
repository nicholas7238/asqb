import React, {useState, useEffect} from 'react'
import { qb } from './QuickbaseTablesInfo';
import { fetchAndCreateTable } from './QuickbaseFetchFuntions';

// related student 8
// related example 9
// last reviewed date 6
// review interval 7

export default function QuizInterface() {
    async function f2() { // gets user token & creates the student examples table
        const queryParams = new URLSearchParams(window.location.search)
        const ut = queryParams.get('ut')
        
        //console.log('Table Arr:', await fetchAndCreateTable(ut, tableInitialInfo))
        //console.log(qb.studentExamples)
        //console.log('Table Arr:', await fetchAndCreateTable(ut, qb.studentExamples))
        const studentExamplesTable = await fetchAndCreateTable(ut, qb.studentExamples)
        console.log('set: ', studentExamplesTable)
        //f3('1', studentExamplesTable)
        //test(studentExamplesTable)
    }

    function f3(studentNum, studentExamplesTable) {
        const newArr = studentExamplesTable.filter(row => row.relatedStudent === studentNum) // string or num?
        console.log('filtered res: ', newArr)
        const newArr2 = newArr.filter(row => {
            const today = new Date()
            const newDay = new Date(row.lastReviewedDate)
            newDay.setDate(newDay.getDate() + parseInt(Math.pow(2, row.reviewInterval)))
            return today >= newDay
        })
        console.log('newArr2: ', newArr2)
    }

    function test(studentExamplesTable) {
        console.log('last rev date of stu0: ', studentExamplesTable[0].lastReviewedDate)
        const revInt = studentExamplesTable[0].reviewInterval
        const d = new Date(studentExamplesTable[0].lastReviewedDate)
        console.log('d: ', d)
        const today = new Date()
        console.log('today: ', today)
        if(today > d) {
            console.log('today is greater than last rev date')
        }

        console.log('revInt: ', revInt)
        console.log('pow: ', Math.pow(2, revInt))
        d.setDate(d.getDate() + parseInt(Math.pow(2, revInt)))
        console.log('newD: ', d)
    }

    useEffect(() => {       
        f2()        
    }, [])

    return (
        <div>
            Hello
        </div>
    )
}
