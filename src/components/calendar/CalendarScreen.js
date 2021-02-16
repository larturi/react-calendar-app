import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { messages } from '../../helpers/calendar-messages-es';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventAddNew, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    // Leo los eventos del store
    const { events } = useSelector(state => state.calendar);
    console.log(events);
   

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClickEvent = (e) => {
        dispatch(uiOpenModal());
    };

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
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

                <AddNewFab />

                <CalendarModal />
            
            </div>

    )
}
