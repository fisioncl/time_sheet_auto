function Util() {
    //__init__
};

/*
 * @return True if this date is Holiday
 */
Util.prototype.isHoliday = function(date) {
    var r = new SpreadSheet().find(config.HOLIDAYS_DS, [date]);
    var is = true;

    if(r === null) is = false; // Not Holiday :( yet

    return is;
};

/*
 * @return the expected number of worked hours for this week.
 *
 */
Util.prototype.getWeekHours = function(date) {
    var key = [date.getFullYear(), date.getWeekNumber()];
    var r = new SpreadSheet().find(config.HOURS_PER_WEEK_DS, key);

    if(r === null) return this.__calculateWeekHours(date);

    return r;
}

Util.prototype.__calculateWeekHours = function(date) {
    var d = date.getDay();
    var first = ( d==date.SUNDAY ? date.addDays(1) : date.subDays(d-1) );
    var hours = 0;

    for (var i=0; i < 5; i++) {
        hours+= ( this.isHoliday(first.addDays(i)) ? 0 : config.HOURS_PER_DAY );
    }

    return hours;
}

/*
 * @return True if date is the last labor day of the week.
 *
 * @param date The date to be tested
 *
 */
Util.prototype.isLastDayOfWeek = function(date) {
    var n = date;

    while(n.getDay() != date.FRIDAY) {
        n = date.addDays(1);
        if(!this.isHoliday(n)) return false;
    }

    return true;
};
