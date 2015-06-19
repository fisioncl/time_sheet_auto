/*
 * Config parameters.
 */
var config = {
    TRIGGER_TIME_ZONE:      'America/Santiago',
    WORKERS_SHEET_NAME:     'worked_hours',
    WORKERS_EMAIL_RANGE:    'A1:A1',
    WORKERS_NAME_RANGE:     'B1:B1',
    WORKERS_TRIBE_RANGE:    'C1:C1',
    WORKERS_WEEKS_RANGE:    'D2:D2', /* Weeks in the worked hours sheet */
    HOURS_PER_DAY:          8,
    EMAIL_DESTINATION:      'cparra@nisum.com',
    HOLIDAYS_DS:            { name: 'data_source', range: 'B3:B999' },
    HOURS_PER_WEEK_DS:      { name: 'data_source', range: 'A1:A1' }
};
