'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { Calendar, dayjsLocalizer, Event } from 'react-big-calendar'
import { IconButton } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import React, { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faAngleRight,
  faAngleLeft,
  faMagnifyingGlass,
  faCircleQuestion,
  faCaretDown,
  faGear,
  faPlus,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

const localizer = dayjsLocalizer(dayjs)
const event = [
  {
    id: 1,
    title: 'Meeting',
    start: dayjs().hour(10).minute(0).toDate(),
    end: dayjs().hour(12).minute(0).toDate(),
  },
]

export default function Home() {
  const calendarRef = useRef<FullCalendar | null>(null)
  const changeView = (newView: string) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(newView) // Use the changeView method
    }
  }

  const calendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin],
    initialView: 'timeGridWeek',
    events: [
      {
        title: 'Event 1',
        start: '2023-09-13',
        end: '2023-09-13',
      },
      {
        title: 'Event 2',
        start: '2023-09-14',
        end: '2023-09-14',
      },
    ],
    headerToolbar: {},
    // dayGridWeek: {
    //   // Customize the hourly grid for dayGridWeek view
    //   slotDuration: '00:30:00', // Display slots every 30 minutes
    //   slotLabelInterval: '01:00:00', // Display hour labels every 1 hour
    // },
    // dayGridDay: {
    //   // Customize the hourly grid for dayGridDay view
      // slotDuration: '00:30:00', // Display slots every 30 minutes
      // slotLabelInterval: '01:00:00', // Display hour labels every 1 hour
    },
  }

  const [value, setValue] = useState<Dayjs | null>(dayjs())

  

  const handleDayClick = (date: Dayjs | null) => {
    // setValue(date)
    // Handle the click event for a selected day here
    console.log('Selected date:', date?.format('YYYY-MM-DD'))
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row' }}>
        <FontAwesomeIcon icon={faBars} />
        <h2 className='normal'>Calendar</h2>
        <button className='rounded'>Today</button>
        <FontAwesomeIcon icon={faAngleLeft} />
        <FontAwesomeIcon icon={faAngleRight} />
        <h2 className='normal'>Today's Date</h2>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <div className='drpdn-btn'>
          <FontAwesomeIcon className='help-btn' icon={faCircleQuestion} />
          <div className='tooltip help- rounded'>
            <h3>Support</h3>
          </div>
          <div className='drpdn-menu rounded help-menu'>
            <ul>
              <li>
                <a href='#'>Help</a>
              </li>
              <li>
                <a href='#'>Training</a>
              </li>
              <li>
                <a href='#'>Updates</a>
              </li>
              <li>
                <a href='#'>Send feedback to Google</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='drpdn-btn'>
          <FontAwesomeIcon className='settings-btn' icon={faGear} />
          <div className='tooltip settings-tip'>Settings menu</div>
          <div className='drpdn-menu rounded settings-menu'>
            <ul>
              <li>
                <a href='#'>Settings</a>
              </li>
              <li>
                <a href='#'>Trash</a>
              </li>
              <li>
                <a href='#'>Density and color</a>
              </li>
              <li>
                <a href='#'>Print</a>
              </li>
              <li>
                <a href='#'>Get add-ons</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='drpdn-btn'>
          <button className='rounded view-btn'>
            Day
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
          <div className='drpdn-menu rounded view-menu'>
            <ul>
              <li>
                <div>
                  <h5 className='float-left'>Day</h5>
                  <h5 className='float-right'>D</h5>
                </div>
              </li>
              <li>
                <div>
                  <h5 className='float-left'>Week</h5>
                  <h5 className='float-right'>W</h5>
                </div>
              </li>
              <li>
                <div>
                  <h5 className='float-left'>Month</h5>
                  <h5 className='float-right'>M</h5>
                </div>
              </li>
              <li>
                <div>
                  <h5 className='float-left'>Year</h5>
                  <h5 className='float-right'>Y</h5>
                </div>
              </li>
              <li>
                <div>
                  <h5 className='float-left'>Schedule</h5>
                  <h5 className='float-right'>A</h5>
                </div>
              </li>
              <li>
                <div>
                  <h5 className='float-left'>4days</h5>
                  <h5 className='float-right'>X</h5>
                </div>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                <h5>Show weekends</h5>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                <h5>Show declined events</h5>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} />
                <h5>Show completed tasks</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <aside>
        <div className='drpdn-btn'>
          <button className='create-btn'>
            <FontAwesomeIcon icon={faPlus} />
            Create
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
          <div className='drpdn-menu rounded create-menu'>
            <ul>
              <li>Event</li>
              <li>Task</li>
              <li>Appointment schedule</li>
            </ul>
          </div>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value} // Convert Dayjs to Date
            onChange={(date) => handleDayClick(date ? dayjs(date) : null)} // Convert Date to Dayjs
            showDaysOutsideCurrentMonth={true}
            fixedWeekNumber={6}
          />
        </LocalizationProvider>
      </aside>
      <article>
        <button onClick={() => changeView('dayGridMonth')}>
          Change to Month View
        </button>
        <button onClick={() => changeView('timeGridWeek')}>
          Change to Week View
        </button>
        <button onClick={() => changeView('timeGridDay')}>
          Change to Day View
        </button>
        <div style={{ width: '600px', height: '400px' }}>
          <FullCalendar {...calendarOptions} ref={calendarRef} />
        </div>
      </article>
    </>
  )
  
}
