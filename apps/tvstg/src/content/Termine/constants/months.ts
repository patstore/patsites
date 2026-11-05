import { PatstoreDate } from "@types";

const months = [
  {
    name: "Januar",
    short: "Jan",
    number: 1,
    dates: [] as PatstoreDate[],
  },
  {
    name: "Februar",
    short: "Feb",
    number: 2,
    dates: [] as PatstoreDate[],
  },
  {
    name: "März",
    short: "Mär",
    number: 3,
    dates: [] as PatstoreDate[],
  },
  {
    name: "April",
    short: "Apr",
    number: 4,
    dates: [] as PatstoreDate[],
  },
  {
    name: "Mai",
    short: "Mai",
    number: 5,
    dates: [] as PatstoreDate[],
  },
  {
    name: "Juni",
    short: "Jun",
    number: 6,
    dates: [] as PatstoreDate[],
  },
  {
    name: "Juli",
    short: "Jul",
    number: 7,
    dates: [] as PatstoreDate[],
  },
  {
    name: "August",
    short: "Aug",
    number: 8,
    dates: [] as PatstoreDate[],
  },
  {
    name: "September",
    short: "Sep",
    number: 9,
    dates: [] as PatstoreDate[],
  },
  {
    name: "Oktober",
    short: "Okt",
    number: 10,
    dates: [] as PatstoreDate[],
  },
  {
    name: "November",
    short: "Nov",
    number: 11,
    dates: [] as PatstoreDate[],
  },
  {
    name: "Dezember",
    short: "Dez",
    number: 12,
    dates: [] as PatstoreDate[],
  },
] as const;

export default months;
