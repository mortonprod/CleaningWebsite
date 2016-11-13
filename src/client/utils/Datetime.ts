export default class DateTimes {
    public day: number;
    public month: number;
    public year: number;
    public minute: number;
    public hour: number;

    constructor(day: number, month: number, year: number, minute: number, hour: number) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.minute = minute;
        this.hour = hour;
    }
}
