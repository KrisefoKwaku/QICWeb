(function(m, u) {
    u.add({
        parseFormats: ["DD/MM/YYYY",  "DD/MM/YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"],
        outputFormat: "DD/MM/YYYY",
        get_date: function() {
            return m().format("DD/MM/YYYY");
        },
        get_datetime: function() {
            return m().format("DD/MM/YYYY HH:mm:ss");
        },
        dateFormatUk: function(date) {
            return m(date).format("DD/MM/YYYY");
        },
        dateFullDate: function(date) {
            return m(date).format("Do MMMM YYYY");
        },
        dbDate: function(date) {
            return m(date, this.parseFormats).format("YYYY-MM-DD HH:mm:ss");
        },
        getYear: function(date) {
            return m(date, this.parseFormats).get("year");
        },
        getMonth: function(date) {
            return m(date, this.parseFormats).get("month");
        },
        getDay: function(date) {
            return m(date, this.parseFormats).get("day");
        },

        /**
         * function to move the date specefied to a future specefied by the amount and the
         * unit used for the fast forward whether days/months/years.
         * @param string date 
         * @param int amnt 
         * @param string unit 
         * @returns string 
         */
        dateFastForward: function(date, amnt, unit) {
            return m(date, this.parseFormats).add(amnt, unit).format(this.outputFormat);
        },

        /**
         * function to move the date specefied to a future specefied by the amount and the
         * unit used for the fast forward whether days/months/years.
         * @param string date 
         * @param int amnt 
         * @param string unit 
         * @returns string 
         */
        dateReverse: function(date, amnt, unit) {
            return m(date, this.parseFormats).subtract(amnt, unit).format(this.outputFormat);
        },

        /**
         * function to check if date1 is equal to date2
         * @param string date1
         * @param string date2
         * @returns bool true if date1 equals date2
         */
        datesEqual: function(date1,date2) {
            return m(date1, this.parseFormats).isSame(m(date2, this.parseFormats));
        },


        /**
         * function to check if date1 comes after date2
         * @param string date1
         * @param string date2
         * @returns bool true if date1 comes after date2
         */
        dateAfter: function(date1,date2) {
            return m(date1, this.parseFormats).isAfter(date2);
        },

        /**
         * function to check if date1 comes before date2
         * @param string date1
         * @param string date2
         * @returns bool true if date1 comes before date2
         */
        dateBefore: function(date1,date2) {
            return m(date1, this.parseFormats).isBefore(m(date2, this.parseFormats));
        },

        /**
         * function to calculate the total number of years between two dates
         * @param string date1
         * @param string date2
         * @returns int the total number of years
         */
        totalYears: function(date1,date2) {
            return m(date1, "DD/MM/YYYY").diff(m(date2, "DD/MM/YYYY"), "years");
        },

        /**
         * function to calculate the total number of months between two dates
         * @param string date1
         * @param string date2
         * @returns int the total number of months 
         */
        totalMonths: function (date1,date2) {
            return m(date1, "DD/MM/YYYY").diff(m(date2, "DD/MM/YYYY"), "months");
        },

        /**
         * function to calculate the total number of days between two dates
         * @param string date1
         * @param string date2
         * @returns int the total number of days 
         */
        totalDays: function (date1, date2) {
            
            return m(date1, "DD/MM/YYYY").diff(m(date2, "DD/MM/YYYY"), "days");
            
        }

    });
})(window.moment, window.utility);