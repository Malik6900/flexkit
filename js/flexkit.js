(function ($) {
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let selectedDate = null;

    function populateCalendar(year, month) {
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const tbody = $(".calendar tbody");
      tbody.empty();

      let row = $("<tr></tr>");
      for (let i = 0; i < firstDay; i++) {
        row.append("<td></td>");
      }

      for (let day = 1; day <= daysInMonth; day++) {
        if (row.children().length === 7) {
          tbody.append(row);
          row = $("<tr></tr>");
        }
        row.append(`<td>${day}</td>`);
      }

      if (row.children().length > 0) {
        tbody.append(row);
      }
    }

    function populateDropdowns() {
      const yearSelect = $(".year-select");
      const monthSelect = $(".month-select");

      yearSelect.empty();
      monthSelect.empty();

      for (let i = currentYear - 100; i <= currentYear + 50; i++) {
        yearSelect.append(`<option value="${i}">${i}</option>`);
      }

      ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].forEach((month, index) => {
        monthSelect.append(`<option value="${index}">${month}</option>`);
      });

      yearSelect.val(currentYear);
      monthSelect.val(currentMonth);
    }

    $(document).ready(function () {
      populateDropdowns();
      populateCalendar(currentYear, currentMonth);

      $(".date-picker input").on("focus", function () {
        $(this).siblings(".calendar").fadeIn();
      });

      $(".calendar").on("change", ".year-select, .month-select", function () {
        currentYear = parseInt($(".year-select").val());
        currentMonth = parseInt($(".month-select").val());
        populateCalendar(currentYear, currentMonth);
      });

      $(".calendar").on("click", "td", function () {
        const day = $(this).text();
        if (day) {
          selectedDate = new Date(currentYear, currentMonth, day);
          $(".date-picker input").val(selectedDate.toISOString().split("T")[0]);
        }
      });

      $(".clear-btn").on("click", function () {
        $(".date-picker input").val("");
        selectedDate = null;
      });

      $(".today-btn").on("click", function () {
        selectedDate = today;
        currentYear = today.getFullYear();
        currentMonth = today.getMonth();
        populateDropdowns();
        populateCalendar(currentYear, currentMonth);
        $(".date-picker input").val(selectedDate.toISOString().split("T")[0]);
      });

      $(".ok-btn").on("click", function () {
        $(this).closest(".calendar").fadeOut();
      });

      $(document).on("click", function (e) {
        if (!$(e.target).closest(".date-picker").length) {
          $(".date-picker .calendar").fadeOut();
        }
      });
    });
  })(jQuery);