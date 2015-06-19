function setUp() {
    /*
     * Trigger creation (just run this one time!)
     */
    ScriptApp.newTrigger("main")
        .timeBased()
        .everyDays(1)
        .atHour(12)
        .atHour(19)
        .inTimeZone(config.TRIGGER_TIME_ZONE)
        .create();
}

/*
 * Entry point for the daily trigger.
 *
 */
function main() {
    // Set the expected number of hours worked this week.
    // Send statics
        // if is the last labor day then
            // send a remainder

}

function onOpen() {
    var spreadsheet = SpreadsheetApp.getActive();
    var menuItems = [
        {name: 'Test', functionName: 'Test'}
    ];
    spreadsheet.addMenu('TimeSheetAut', menuItems);
}

function Test() {
    var t = new Date();
    var u = new Util();

    Logger.log(u.isHoliday(t));
    Logger.log(u.getWeekHours(t));
    Logger.log(u.isLastDayOfWeek(t));
    Logger.log( t.getDayOfThisWeek(t.SATURDAY) );
    //MailApp.sendEmail('cristian@fision.cl', 'Log', Logger.getLog());
}
