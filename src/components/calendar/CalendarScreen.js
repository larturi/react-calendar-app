import React, { useEffect, useState } from 'react';
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
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    // Leo los eventos del store
    const { events, activeEvent } = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const { uid } = useSelector(state => state.auth)

    useEffect(() => {
       dispatch( eventStartLoading() );
    }, [dispatch]);

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

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367cf7' : '#465660',
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
                    onView={ onViewChange }
                    onSelectSlot={ onSelectSlot }
                    selectable={ true }
                    view={ lastView }
                    components={{
                        event: CalendarEvent
                    }}
                />

                <AddNewFab />

                {
                    (activeEvent) && <DeleteEventFab/>
                }

                <CalendarModal />
            
            </div>

    )
}
