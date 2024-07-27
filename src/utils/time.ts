import moment from 'moment';

export const getCurrentDateTime = (format: string = 'MM.DD.YYYY' ) => {
    var dateTime = new Date();
    return moment(dateTime).format(format);
}