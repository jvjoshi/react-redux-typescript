import moment from 'moment';

export default class Util {
    public static formatAsMMMDYYYY(date: Date) {
        if (!date) {
            return "";
        }
        return moment(date).format('MMM d, YYYY');
    }

    public static getTimeFromNow(date: Date) {
        if (!date) {
            return "";
        }
        return moment(date).fromNow();
    }
}