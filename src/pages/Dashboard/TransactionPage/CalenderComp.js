import React from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalenderComp({ value, onChange }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [calendarOpen, setCalendarOpen] = useState(null);

    const handleInputClick = (type) => {
        setCalendarOpen(type);
    };

    const handleCalendarClose = () => {
        setCalendarOpen(null);
    };

    const handleDateChange = (newDate) => {
        if (calendarOpen === 'start') {
            setStartDate(newDate);
            setCalendarOpen('end');
        } else if (calendarOpen === 'end') {
            setEndDate(newDate);
            setCalendarOpen(null);
        }
    };

    return (
        <div className='flex flex-col'>
            <div className="flex flex-col">

                <div className="flex items-center justify-between">
                    <p>Start Date:</p>
                    <input
                        type="text"
                        className='input-box'
                        value={startDate ? startDate.toLocaleDateString() : ''}
                        onClick={() => handleInputClick('start')}
                    />
                </div>

                <div className='flex items-center justify-between'>
                    <p>End Date:</p>
                    <input
                        type="text"
                        className='input-box'
                        value={endDate ? endDate.toLocaleDateString() : ''}
                        onClick={() => handleInputClick('end')}
                    />
                </div>
            </div>
            <br />
            <div className="flex justify-center">
                {calendarOpen === 'start' ? (
                    <Calendar
                        onChange={handleDateChange}
                        value={startDate || new Date()}
                    />
                ) : null}
                {calendarOpen === 'end' ? (
                    <Calendar
                        onChange={handleDateChange}
                        value={endDate || new Date()}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default CalenderComp
