"use client";
import TemplatePage from "@/components/common/TemplatePage/TemplatePage";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
const events = [{ title: "Meeting", start: new Date() }];

export default function page() {
  return (
    <TemplatePage title="Agenda">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        locale={ptBrLocale}
      />
    </TemplatePage>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
