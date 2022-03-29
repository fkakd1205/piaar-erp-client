import moment from 'moment';

function getRemainingDateCount(closingDate) {
    let currDate = new Date();
    let nextDate = new Date(closingDate);

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.ceil((nextDate - currDate) / oneDay);

    return diffDays;
}

function getStartDate(date) {
    let cdate = new Date(date);
    cdate.setHours(0);
    cdate.setMinutes(1);
    cdate.setSeconds(0);
    cdate.setMilliseconds(0);
    return cdate;
}

function getEndDate(date) {
    let cdate = new Date(date);
    cdate.setHours(23);
    cdate.setMinutes(58);
    cdate.setSeconds(59);
    cdate.setMilliseconds(0);
    return cdate
}

function dateToYYMMDD(date) {
    var d = new Date(date)
    return moment(d).format("YY.MM.DD");
}

function dateToYYYYMMDD(date) {
    var d = new Date(date)
    return moment(d).format("YYYY-MM-DD");
}

function dateToYYYYMMDDhhmmss(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function dateToYYMMDDhhmmss(idate) {
    var date = new Date(idate);
    return moment(date).format("YY/MM/DD HH:mm:ss");
}

function dateToYYYYMMDDhhmmssFile(idate) {
    var date = new Date(idate);
    return moment(date).format("YYYYMMDDHHmmss");
}

export {
    getStartDate,
    getEndDate,
    dateToYYMMDD,
    dateToYYYYMMDD,
    dateToYYYYMMDDhhmmss,
    dateToYYMMDDhhmmss,
    dateToYYYYMMDDhhmmssFile,
    getRemainingDateCount
}