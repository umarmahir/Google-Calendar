'use client'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Popover from '@mui/material/Popover'
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
import React, { useState, useRef, useEffect } from 'react'
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
  faTimes,
  faClock,
} from '@fortawesome/free-solid-svg-icons'

const localizer = dayjsLocalizer(dayjs)

export default function Home() {
  const [date, setDate] = useState<Date | null>(null)
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const [calendarTitle, setCalendarTitle] = useState<string>('')
  const [openPopover, setOpenPopover] = useState(false)
  const calendarRef = useRef<FullCalendar | null>(null)

  const updateCalendarTitle = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      const view = calendarApi.view

      if (view.type === 'timeGridDay') {
        setCalendarTitle(view.title) // Display date for day view
      } else if (view.type === 'timeGridWeek' || view.type === 'dayGridMonth') {
        setCalendarTitle(view.title.replace(/\d{4}-\d{2}-/, '')) // Display month and year for week and month views
      } else if (view.type === 'dayGridYear') {
        setCalendarTitle(view.title.replace(/-/, '')) // Display only the year for year view
      }
    }
  }

  useEffect(() => {
    updateCalendarTitle()
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      calendarApi.on('datesSet', updateCalendarTitle) // Subscribe to view change events
    }
  }, [])

  const prevFunc = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev()
    }
  }

  const nextFunc = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next()
    }
  }

  const todayFunc = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today()
    }
  }

  const changeView = (newView: string) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(newView)
    }
  }

  const addManualEvent = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()

      const newEvent = {
        title: 'Add Event',
        start: '2023-10-13T08:00:00',
        end: '2023-10-13T09:00:00',
      }

      calendarApi.addEvent(newEvent)
    }
  }

  const handleOpenPopover = () => {
    setOpenPopover(true)
  }

  const handleClosePopover = () => {
    setOpenPopover(false)
  }

  const calendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin],
    initialView: 'timeGridWeek',
    events: [
      {
        title: 'Event 1',
        start: '2023-10-11T08:00:00',
        end: '2023-10-11T08:30:00',
      },
      {
        title: 'Event 2',
        start: '2023-10-12T09:00:00',
        end: '2023-10-12T10:00:00',
      },
    ],
    slotDuration: '01:00:00',
    allDaySlot: false,
    nowIndicator: true,
    editable: true,
    navLinks: true,
  }

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
        <button className='rounded' onClick={todayFunc}>
          Today
        </button>
        <FontAwesomeIcon icon={faAngleLeft} onClick={prevFunc} />
        <FontAwesomeIcon icon={faAngleRight} onClick={nextFunc} />
        <h2 className='normal'>{calendarTitle}</h2>
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
        <button onClick={addManualEvent}>Add Event</button>
        <button onClick={handleOpenPopover}>Open popover</button>
        <Popover
          open={openPopover}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <FontAwesomeIcon icon={faTimes} onClick={handleClosePopover} />
          <TextField
            id='standard-basic'
            placeholder='Add Title'
            variant='standard'
          />

          <h2>Event</h2>
          <h2>Task</h2>
          <h2>Appointment Schedule</h2>
          <div>
            <FontAwesomeIcon icon={faClock} />
            <DatePicker
              renderInput={(params: TextFieldProps) => (
                <TextField
                  {...params}
                  InputProps={{ ...params.InputProps, endAdornment: null }}
                />
              )}
              inputFormat='EEEE, MMMM d'
              // other props
            />
          </div>
        </Popover>
        <div style={{ width: '600px', height: '400px' }}>
          <FullCalendar
            {...calendarOptions}
            ref={calendarRef}
            dateClick={addManualEvent}
          />
        </div>
      </article>
    </>
  )
}
