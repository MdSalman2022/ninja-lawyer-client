import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalenderComp() {

    const [value, onChange] = useState(new Date());

    console.log(value)


    return (
        <Calendar className="react-calender-bg-red-400" onChange={onChange} value={value} />
    )
}

export default CalenderComp
