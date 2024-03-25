import { Component, createSignal, createEffect, createMemo } from 'solid-js';

const MAX_EXPIRATION_SECONDS = 15768000;

const Calendar: Component<{ value: () => Date; onChange: (date: Date) => void }> = (props) => {
  const [currentDate, setCurrentDate] = createSignal(new Date());

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      if (newDate.getTime() < Date.now()) {
        return prevDate;
      }
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      const maxDate = new Date(Date.now() + MAX_EXPIRATION_SECONDS * 1000);
      if (newDate > maxDate) {
        return prevDate;
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    if (date.getTime() <= Date.now() + MAX_EXPIRATION_SECONDS * 1000) {
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      props.onChange(utcDate);
      setCurrentDate(() => utcDate);
    }
  };

  const firstDayOfMonth = new Date(currentDate().getFullYear(), currentDate().getMonth(), 1).getDay() || 7;
  const daysArray = createMemo(() => Array.from({ length: new Date(currentDate().getFullYear(), currentDate().getMonth() + 1, 0).getDate() }, (_, i) => new Date(currentDate().getFullYear(), currentDate().getMonth(), i + 1)));
  console.log('daysArray: ', daysArray());
  console.log('firstDayOfMonth: ', firstDayOfMonth);
  createEffect(() => {
    console.log('Current date changed:', currentDate());
  });

  return (
    <div class="calendar">
      <div class="calendar-header">
        <button data-datatype="month" type="button" class="prev-month" onClick={handlePrevMonth}>
          &lt;
        </button>
        <div class="month-year">{currentDate().toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <button data-datatype="month" type="button" class="next-month" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div class="calendar-grid">
        <div class="day-names">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div class="day-name">{day}</div>
          ))}
        </div>
        <div class="day-cells">
          {Array.from({ length: firstDayOfMonth - 1 }, () => (
            <div class="day-cell empty" />
          ))}
          {daysArray().map((day) => (
            <div
              class="day-cell"
              classList={{
                selected: day.toDateString() === props.value().toDateString(),
                disabled: day.getTime() > Date.now() + MAX_EXPIRATION_SECONDS * 1000,
                highlight: day.getTime() <= Date.now() + MAX_EXPIRATION_SECONDS * 1000 && day.getTime() >= Date.now(), // новый класс
              }}
              onClick={() => handleDateClick(day)}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
