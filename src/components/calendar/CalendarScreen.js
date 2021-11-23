import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { eventSetActive, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

// const events = [
//   {
//     title: "Cumpleaños Antonita",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     bgcolor: "#fafafa",
//     notes: "Estudiar",
//     user: {
//       uid: "1234",
//       name: "Miguel",
//     },
//   },
// ];

export const CalendarScreen = () => {
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { uid } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

    useEffect(() => {
      dispatch( eventStartLoading());
    }, [dispatch])


  const onDobleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
    
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventeStyleGetter = (event, start, end, inSelected) => {
    

    const style = {
      backgroundColor: (uid === event.user._id)? "blue": "grey",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };
  //console.log(lastView)
  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventeStyleGetter}
        onDoubleClickEvent={onDobleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal />
      <AddNewFab />
      {
        activeEvent !== null? <DeleteEventFab/>:null
      }
      
    </div>
  );
};
