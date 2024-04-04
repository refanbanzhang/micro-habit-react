import { getWeekDatesByDate } from "./useData";

it("should be equal", () => {
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
