import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { messages } from '../../helpers/calendar-messages-es';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [{
    title: 'Cumpleaños Cande',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar pastel',
    user: {
        _id: '123',
        name: 'Pedro'
    }
}];

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClickEvent = (e) => {
        console.log('click');
    };

    const onSelectEvent = (e) => {
        console.log('select');
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#367cf7',
            borderRadious: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screen">

            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClickEvent }
                onSelectEvent={ onSelectEvent }
                onView={onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal />

        </div>
    )
}
