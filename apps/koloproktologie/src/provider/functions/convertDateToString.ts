import { format } from "date-fns/format";

const convertDateToString = (date: Date | string): string => {
    let dateValue: Date = new Date();
    if (date) {
        const newDateValue = new Date(date);
        if (isNaN(newDateValue.getTime())) {
            dateValue = new Date();
        }
    }
    const formattedDate = format(dateValue, "yyyy-MM-dd'T'HH:mm:ss");

    return formattedDate;
};

export default convertDateToString;
