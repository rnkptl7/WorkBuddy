import { Timestamp } from "firebase/firestore";
import moment from "moment";

function formatDate(date: Timestamp, dateFormat: string): string;
function formatDate(date: Timestamp): string;
function formatDate(data: Timestamp, dateFormat?: string): string {
    const seconds = data.seconds;
    const nanoseconds = data.nanoseconds;
    const date = moment
        .unix(seconds)
        .add(nanoseconds / 1000000, "milliseconds");
    if (dateFormat) {
        return date.format(dateFormat);
    }
    return date.toString();
}

export default formatDate;
