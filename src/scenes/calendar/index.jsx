import { useState } from 'react'
// import Fullcalendar, { formatDate } from '@fullcalendar/react'
import Fullcalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material'
import Header from '../../components/Header'
import { tokens } from '../../theme'
import { formatDate } from '@fullcalendar/core'

const Calendar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [currentEvents, setCurrentEvents] = useState([])

    const handleDateClick = (selected) => {

        // console.log('select', selected)
        const title = prompt("Please enter a new title for your event")
        const calendarApi = selected.view.calendar
        calendarApi.unselect()

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            })
        }
    }

    const handleEventClick = (selected) => {
        // console.log('event click', selected)
        if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}' `)) {
            selected.event.remove()
        }
    }

    return <Box m="20px">
        <Header title="ปฏิทิน" subtitle="ตารางกิจกรรม" />
        <Box display="flex" justifyContent="space-between">
            {/* CALENDAR SIDEBAR */}
            <Box
                flex="1 1 20%"
                backgroundColor={colors.primary[400]}
                p="15px"
                borderRadius="4px"
            >
                <Typography variant='h5'>กิจกรรม</Typography>
                <List>
                    {currentEvents.map((event) => (
                        <ListItem
                            key={event.id}
                            sx={{ backgroundColor: colors.yellowAccent[500], margin: "10px 0", borderRadius: "2px" }}
                        >
                            <ListItemText
                                primary={event.title}
                                secondary={
                                    <Typography>
                                        {formatDate(event.start, {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        })}
                                    </Typography>
                                }
                            />

                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* CALENDAR */}
            <Box flex="1 1 100%" ml="15px">
                <Fullcalendar
                    height="75vh"
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin
                    ]}
                    headerToolbar={{
                        left: "prev,next,today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    eventsSet={(events) => setCurrentEvents(events)}
                    initialEvents={[
                        { id: "1", title: "All-day event", date: "2024-03-30" },
                        { id: "2", title: "Customers meeting", date: "2024-04-02" },
                    ]}
                />
            </Box>
        </Box>
    </Box>
}

export default Calendar