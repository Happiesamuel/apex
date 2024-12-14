import "@/app/globals.css";
import { toast } from "@/hooks/use-toast";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInDays,
  differenceInSeconds,
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  getHours,
  getMinutes,
  getSeconds,
  isSameWeek,
  isToday,
  isYesterday,
  parseISO,
  startOfWeek,
} from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function Toast({ description, title }) {
  return toast({
    title: title,
    description: description,
    variant: "destructive",
    className: "bg-bgBlur border-2 border-buttonOrange ",
  });
}
export function generateAccountNumber() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const timestamp = year + month + day + hours + minutes + seconds;
  return timestamp.slice(0, 10);
}
export function convertTimestampToDate(timestamp) {
  const milliseconds = timestamp.seconds * 1000;

  const nanosecondsToMilliseconds = timestamp.nanoseconds / 1000000;

  return new Date(milliseconds + nanosecondsToMilliseconds);
}
export function isoToTimestamp(isoString) {
  const date = parseISO(isoString); // Convert ISO string to Date object
  return date.getTime(); // Return timestamp in milliseconds
}

// Usage example

export const parseStringify = (value) => JSON.parse(JSON.stringify(value));
function getOrdinal(day) {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = day % 100;
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
}

export function formatDate(isoString) {
  const parsedDate = parseISO(isoString);
  return format(parsedDate, "dd MMM yyyy, hh:mm a");
}

export function generateAlphanumericID(length = 20) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}
export function capitalizeWords(str) {
  if (!str) return ""; // Handle empty strings
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatRelativeTime(dateString) {
  const date = parseISO(dateString);
  const result = formatDistanceToNow(date, { addSuffix: true });
  return result;
}

export function formatTodayDate(dateString) {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else if (differenceInDays(new Date(), date) <= 14) {
    // If the date is within the last 2 weeks, use relative formatting
    return formatDistanceToNowStrict(date, { addSuffix: true });
  } else {
    // For dates beyond 2 weeks, return a standard date format
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }
}

export function allTransactions(recentTransactions, user) {
  const arr1 = recentTransactions
    .flat()
    .filter((x) => x.status === "withdrawal" && x.depName === user.fullName);
  const arr2 = recentTransactions
    .flat()
    .filter((x) => x.credName === user.fullName && x.status === "deposit");
  const newArr = [...arr1, ...arr2].sort(
    (a, b) => isoToTimestamp(b["$createdAt"]) - isoToTimestamp(a["$createdAt"])
  );
  return newArr;
}
export function allNotifications(notifications, user, type) {
  // if (type === "unread") {
  //   const arr1 = notifications.flat().filter((x) => x.status === false);
  //   console.log(arr1);
  // }
  const arr1 = notifications
    .flat()
    .filter(
      (x) =>
        x.status === (type === "read" ? true : false) &&
        x.senderId === user.$id &&
        x.title === "Withdrawal"
    );
  const arr2 = notifications
    .flat()
    .filter(
      (x) =>
        x.status === (type === "read" ? true : false) &&
        x.recieverId === user.$id &&
        x.title === "Deposit"
    );
  const arr3 = notifications.flat().filter((x) => {
    return (
      x.status === (type === "read" ? true : false) &&
      x.recieverId === user.$id &&
      x.senderId === process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
      x.senderName === "Apex"
    );
  });
  // console.log(arr3, user);
  const arr4 = notifications
    .flat()
    .filter(
      (x) =>
        x.status === (type === "read" ? true : false) &&
        x.senderId === process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
        x.title === "Withdrawal"
    );
  const newArr = [...arr1, ...arr2, ...arr3, ...arr4].sort(
    (a, b) => isoToTimestamp(b["$createdAt"]) - isoToTimestamp(a["$createdAt"])
  );
  return newArr;
}
export function reducedArr(arr) {
  return arr.reduce((a, b) => a + b);
}

function addOrdinalSuffix(day) {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = day % 100;
  return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}

export function formatChartDate(x, type) {
  const date = new Date(x);
  const day = format(date, "d"); // Get the day of the month
  const month = format(date, "MMM"); // Get the short month name

  const formattedDate =
    type === "monthly"
      ? `${month}`
      : `${addOrdinalSuffix(Number(day))} ${month}`;
  return formattedDate;
}

export function dayOfWeek(day) {
  const date = new Date(day);
  const dayOfWeek = format(date, "EEEE");

  return dayOfWeek;
}
export function calcSlice(transactions, val) {
  return transactions.map((x) => {
    if (val === "daily") {
      return x.data.slice(0, 10); // YYYY-MM-DD
    } else if (val === "monthly") {
      return x.data.slice(0, 7); // YYYY-MM
    } else if (val === "weekly") {
      return x.data.slice(); // Format the week's start date
    } else {
      return x.data.slice(0, 2); // Default case (example purpose)
    }
  });
}

// Group dates by week and assign unique numbers
export function modifyTransaction(transactions) {
  const result = transactions
    .map((x) => x.date)
    .reduce((acc, date) => {
      const currentDate = parseISO(date);
      let weekNumber = -1;

      // Check if the date belongs to an existing group
      acc.forEach((group, index) => {
        if (
          isSameWeek(currentDate, parseISO(group.dates[0]), { weekStartsOn: 0 })
        ) {
          weekNumber = index; // Assign the current group index as the week number
        }
      });

      // If not in any existing group, create a new group
      if (weekNumber === -1) {
        weekNumber = acc.length;
        acc.push({ weekNumber, dates: [date] });
      } else {
        acc[weekNumber].dates.push(date);
      }

      return acc;
    }, []);

  // Append the week number to each date
  const updatedDates = result.flatMap((group) =>
    group.dates.map((date) => {
      return `${date.slice(0, 10)}%${group.weekNumber + 1}${date.slice(10)}`;
    })
  );

  return transactions.map((x) => {
    const a = updatedDates.find((y) => y.startsWith(x.date.slice(0, 10)));
    return { ...x, data: a };
  });
}
export function claimDate(day) {
  const date = new Date(day);
  const timezoneOffset = 0;

  const utcDate = new Date(date.getTime() - timezoneOffset * 60 * 1000);

  const formattedDate = format(utcDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  return formattedDate;
}
export function subtractDays(a, b) {
  const date1 = parseISO(a);
  const date2 = parseISO(b);

  return differenceInSeconds(date1, date2);
}

export function formatClaimDate(dateString) {
  const date = parseISO(dateString);

  const hours = getHours(date); // 12
  const minutes = getMinutes(date); // 36
  const seconds = getSeconds(date); // 33

  // Format the output as "00h:00m:00s"
  const formattedTime = `${String(hours).padStart(2, "0")}h:${String(
    minutes
  ).padStart(2, "0")}m:${String(seconds).padStart(2, "0")}s`;

  return formattedTime;
}
export function formatBack(dateString) {
  // Create a Date object from the string
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "short", // Abbreviated day of the week (e.g., "Sat")
    year: "numeric", // Full year (e.g., "2024")
    month: "short", // Abbreviated month name (e.g., "Dec")
    day: "numeric", // Day of the month (e.g., "14")
    hour: "2-digit", // Hour (2-digit format)
    minute: "2-digit", // Minute (2-digit format)
    second: "2-digit", // Second (2-digit format)
    timeZoneName: "short", // Timezone abbreviation (e.g., "GMT+01:00")
    timeZone: "Africa/Lagos", // Specify the timezone for West Africa Standard Time
  });

  const timeZoneOffset = date.toString().match(/([A-Z]+[+-][0-9]{4})/)[0];

  // Combine to get the final format
  const finalDate = `${formattedDate.replace(",", "")} ${timeZoneOffset}`;

  return finalDate;
}
