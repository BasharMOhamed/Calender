document.addEventListener("DOMContentLoaded", function () {
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const monthYear = document.getElementById("month-year");
  const daysContainer = document.getElementById("days");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  const generateCalendar = (month, year) => {
    daysContainer.innerHTML = "";
    monthYear.innerHTML = `${new Date(year, month).toLocaleString("default", {
      month: "long",
    })} ${year}`;

    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Dates from the previous month
    for (let i = startDay - 1; i >= 0; i--) {
      const prevMonthDay = daysInPrevMonth - i;
      const dayDiv = document.createElement("div");
      dayDiv.textContent = prevMonthDay;
      dayDiv.classList.add("prev-next-month");
      daysContainer.appendChild(dayDiv);
    }

    // Dates for the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement("div");
      if (
        currentDate.getDate() === i &&
        currentDate.getFullYear() === currentYear &&
        currentDate.getMonth() === currentMonth
      )
        dayDiv.classList.add("current");
      else dayDiv.classList.remove("current");
      dayDiv.textContent = i;
      daysContainer.appendChild(dayDiv);
    }

    const totalCells = daysContainer.childElementCount;
    const nextMonthStartDay = 1;
    for (let i = totalCells; i < 35; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = nextMonthStartDay + (i - totalCells);
      dayDiv.classList.add("prev-next-month");
      daysContainer.appendChild(dayDiv);
    }
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    generateCalendar(currentMonth, currentYear);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    generateCalendar(currentMonth, currentYear);
  };

  prevButton.addEventListener("click", previousMonth);
  nextButton.addEventListener("click", nextMonth);

  generateCalendar(currentMonth, currentYear);
});
