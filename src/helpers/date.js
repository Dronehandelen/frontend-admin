import moment from 'moment';

const date = {
    niceDateTime: (dateToFormat) =>
        moment(dateToFormat).format('D. MMM YYYY HH:mm'),
    niceDate: (date) => moment(date).format('DD.MM.YYYY'),
    niceReadableDate: (date) => moment(date).format('D. MMMM YYYY'),
};

export default date;
