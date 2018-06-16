import moment from 'moment';

const formatTime = (time, format) => moment.utc(time).format(format);

const formatTimeFromNow = time => moment.utc(new Date(time)).fromNow();

export { formatTime, formatTimeFromNow };
