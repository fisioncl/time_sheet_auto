/*
 * Days constants
 */
Date.prototype.SUNDAY = 0;
Date.prototype.MONDAY = 1;
Date.prototype.TUESDAY = 2;
Date.prototype.WEDNESDAY = 3;
Date.prototype.THURSDAY = 4;
Date.prototype.FRIDAY = 5;
Date.prototype.SATURDAY = 6;

/*
 * @param days Number of days to add
 * @return A new date with the computed value.
 */
Date.prototype.addDays = function(days) {
    return this.__addOrSubDays(days);
};

/*
 * @param days Number of days to subtract
 * @return A new date with the computed value.
 */
Date.prototype.subDays = function(days) {
    return this.__addOrSubDays(days*-1);
};

Date.prototype.__addOrSubDays = function(days) {
    return new Date(this.getTime() + days * (24 * 3600 * 1000));
};

Date.prototype.getDayOfThisWeek = function(day) {
    var td = this.getDay();
    var d = ( td > day ? day - td : td - day );

    Logger.log(' D %s' + d);

    var res = new Date(+this).__addOrSubDays(d);

    Logger.log(' Days %s' + res);

    return res;
};

/*
 * Get the week of the year of this date.
 *
 * @link http://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 *
 * @return week of the year
 *
 */
Date.prototype.getWeekNumber = function() {
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));

    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

/*
 * @return The name of the weekday
 */
Date.prototype.getDayName = function() {
    var name = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];

    return name[this.getDay()];
};

/*
 *
 * Compare two dates ignoring the time part.
 *
 * @return True or False
 *
 */
Date.prototype.equalsTo = function(date) {
    if( !(date instanceof Date) ) return false;
    if(date.getFullYear() != this.getFullYear()) return false;
    if(date.getMonth() != this.getMonth()) return false;
    if(date.getDayOfTheMonth() != this.getDayOfTheMonth()) return false;

    return true;
};

/*
 * @return The day number of the month. (1-31)
 *
 */
Date.prototype.getDayOfTheMonth = function() {
    return this.getUTCDate();
};
