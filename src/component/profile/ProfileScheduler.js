import * as React from "react";
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';

export class ProfileScheduler extends React.Component{

    render() {
        return (
            <FullCalendar defaultView="listWeek" plugins={[ listPlugin ]}/>
        );
    }
}
