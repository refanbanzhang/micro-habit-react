import { getWeekDatesByDate, getMonthDatesByDate } from "./useData";

it("should be equal with week", () => {
  const target = [
    "2024-04-01",
    "2024-04-02",
    "2024-04-03",
    "2024-04-04",
    "2024-04-05",
    "2024-04-06",
    "2024-04-07",
  ];
  expect(getWeekDatesByDate("2024-4-1")).toEqual(target);
  expect(getWeekDatesByDate("2024-4-2")).toEqual(target);
  expect(getWeekDatesByDate("2024-4-3")).toEqual(target);
  expect(getWeekDatesByDate("2024-4-4")).toEqual(target);
  expect(getWeekDatesByDate("2024-4-5")).toEqual(target);
  expect(getWeekDatesByDate("2024-4-6")).toEqual(target);
  expect(getWeekDatesByDate("2024-4-7")).toEqual(target);
});

it("should be equal with month", () => {
  const target = [
    "2024-04-01",
    "2024-04-02",
    "2024-04-03",
    "2024-04-04",
    "2024-04-05",
    "2024-04-06",
    "2024-04-07",
    "2024-04-08",
    "2024-04-09",
    "2024-04-10",
    "2024-04-11",
    "2024-04-12",
    "2024-04-13",
    "2024-04-14",
    "2024-04-15",
    "2024-04-16",
    "2024-04-17",
    "2024-04-18",
    "2024-04-19",
    "2024-04-20",
    "2024-04-21",
    "2024-04-22",
    "2024-04-23",
    "2024-04-24",
    "2024-04-25",
    "2024-04-26",
    "2024-04-27",
    "2024-04-28",
    "2024-04-29",
    "2024-04-30",
  ];
  expect(getMonthDatesByDate("2024-4-1")).toEqual(target);
  expect(getMonthDatesByDate("2024-4-5")).toEqual(target);
  expect(getMonthDatesByDate("2024-4-10")).toEqual(target);
  expect(getMonthDatesByDate("2024-4-15")).toEqual(target);
  expect(getMonthDatesByDate("2024-4-20")).toEqual(target);
  expect(getMonthDatesByDate("2024-4-25")).toEqual(target);
  expect(getMonthDatesByDate("2024-4-30")).toEqual(target);
});
