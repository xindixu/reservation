import { createGlobalStyle } from 'styled-components'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'

export const CalendarGlobalStyleOverride = createGlobalStyle`
  .fc-event {
    border: #bbb;
    background-color: #bbb;
  }

`
