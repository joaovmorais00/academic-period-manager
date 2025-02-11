"use client";
import TemplatePage from "@/components/common/TemplatePage/TemplatePage";
import EventContent from "@/components/Scheduler/EventContent/EventContent";
import EventPopover from "@/components/Scheduler/EventPopover/EventPopover";
import AppointmentController from "@/controllers/appointment-controller";
import { EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal.js";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import CreateEventButton from "@/components/Scheduler/CreateEvent/CreateEventButton/CreateEventButton";
import CreateEventModal from "@/components/Scheduler/CreateEvent/CreateEventModal/CreateEventModal";
import SubjectController from "@/controllers/subject-controller";

export default function page() {
  const session = useSession();
  const [events, setEvents] = useState<EventInput[]>([]);
  const [anchorPopover, setAnchorPopover] = useState<HTMLButtonElement | null>(
    null
  );
  const [selectedEvent, setSelectedEvent] = useState<EventImpl | null>(null);
  const [openCreateEventModal, setOpenCreateEventModal] =
    useState<boolean>(false);
  const [selectedTypeEventToCreate, setSelectedTypeEventToCreate] =
    useState<string>("");

  function handleClickEvent(info: EventClickArg) {
    setSelectedEvent(info.event);
    setAnchorPopover(info.el as HTMLButtonElement);
  }

  const handleClosePopover = () => {
    setSelectedEvent(null);
    setAnchorPopover(null);
  };

  const handleSelectTypeEventToCreate = (typeEvent: string) => {
    setSelectedTypeEventToCreate(typeEvent);
    setOpenCreateEventModal(true);
  };

  const handleCloseCreateEventModal = (createdEvent?: boolean) => {
    if (createdEvent) getEvents();
    setOpenCreateEventModal(false);
    setSelectedTypeEventToCreate("");
  };

  const getEvents = () => {
    SubjectController.getAllEventsByUserId(session.data?.user.id ?? "").then(
      (response) => {
        setEvents(response);
      }
    );
  };

  useEffect(() => {
    if (session.data?.user.id) getEvents();
  }, [session]);

  return (
    <>
      <TemplatePage title="Agenda">
        <div className={styles.createEventButton}>
          <CreateEventButton
            handleSelectTypeEvent={handleSelectTypeEventToCreate}
          />
        </div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={EventContent}
          locale={ptBrLocale}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          eventClick={handleClickEvent}
        />
        <EventPopover
          event={selectedEvent}
          onClose={handleClosePopover}
          anchorEl={anchorPopover}
        ></EventPopover>
        <CreateEventModal
          open={openCreateEventModal}
          handleClose={handleCloseCreateEventModal}
          typeEvent={selectedTypeEventToCreate}
        />
      </TemplatePage>
    </>
  );
}
