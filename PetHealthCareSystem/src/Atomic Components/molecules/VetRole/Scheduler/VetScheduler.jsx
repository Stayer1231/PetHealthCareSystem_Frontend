import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format, startOfDay } from 'date-fns';
import './VetScheduler.scss';

function VetScheduler() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [initialDate, setInitialDate] = useState(null);

    const handleDateClick = (arg) => {
        const clickedDate = startOfDay(arg.date);
        setSelectedDate(clickedDate);
        setInitialDate(clickedDate);
        console.log('Date Clicked:', clickedDate);
    };

    const events = [
        { title: 'Check-up 1', start: '2024-06-19T09:00:00', end: '2024-06-19T10:00:00' },
        { title: 'Check-up 2', start: '2024-06-19T11:00:00', end: '2024-06-19T12:00:00' },
        { title: 'Check-up 3', start: '2024-06-19T13:00:00', end: '2024-06-19T14:00:00' },
        { title: 'Check-up 4', start: '2024-06-19T15:00:00', end: '2024-06-19T16:00:00' },
        { title: 'Check-up 5', start: '2024-06-19T17:00:00', end: '2024-06-19T18:00:00' },
        { title: 'Surgery', start: '2024-06-20T11:00:00', end: '2024-06-20T14:00:00' },
        { title: 'Vaccination', start: '2024-06-21T13:00:00', end: '2024-06-21T13:30:00' },
        { title: 'Consultation', start: '2024-06-22T15:00:00', end: '2024-06-22T16:00:00' },
        { title: 'Follow-up', start: '2024-06-23T10:00:00', end: '2024-06-23T11:00:00' },
        { title: 'Emergency', start: '2024-06-24T08:00:00', end: '2024-06-24T08:30:00' },
    ];

    return (
        <div className="vet-scheduler">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    start: 'today,prev,next',
                    center: 'title',
                    end: 'timeGridWeek'
                }}
                slotMinTime="08:00:00"
                slotMaxTime="17:00:00"
                slotDuration="00:30:00"
                allDaySlot={false}
                height={750}
                dateClick={handleDateClick}
                events={events}
                initialDate={initialDate ? initialDate : null}
                dayCellClassNames={(arg) => {
                    const cellDate = startOfDay(arg.date);
                    if (selectedDate && cellDate.getTime() === selectedDate.getTime()) {
                        return ['fc-day-selected'];
                    }
                    return [];
                }}
            />
        </div>
    );
}

export default VetScheduler;
