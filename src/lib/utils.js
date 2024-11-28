import "@/app/globals.css";
import { toast } from "@/hooks/use-toast";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInDays,
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  isToday,
  isYesterday,
  parseISO,
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
