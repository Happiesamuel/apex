"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "./appwrite";
import { parseStringify } from "./utils";
import { signIn, signOut } from "./auth";

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function signInWithGoogleAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signInWithFacebookAction() {
  await signIn("facebook", { redirectTo: "/account" });
}
export async function signInWithCredentials(data) {
  await signIn("credentials", data);
}

export async function getUsers() {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_ID
    );
    return response.documents;
  } catch (error) {
    throw new Error("Error fetching documents:", error);
  }
}

export async function createUser(obj) {
  try {
    const { database } = await createAdminClient();
    const newUser = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_ID,
      ID.unique(),
      obj
    );
    return newUser;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}
export async function createBill(obj) {
  try {
    const { database } = await createAdminClient();
    const bill = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_BILLS_ID,
      ID.unique(),
      obj
    );
    revalidatePath("/account");
    return bill;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}
export const getUsersByEmail = async (email) => {
  try {
    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_ID,
      [Query.equal("email", email)]
    );

    // console.log(user.documents.at(0));
    return user.documents.at(0);
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
};
export const getUsersById = async (id) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_ID,
      [Query.equal("$id", id)]
    );
    return user.documents.at(0);
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
};
export async function updateUser(documentId, obj) {
  try {
    if (Object.keys(obj).at(0) !== "image") {
      const { database } = await createAdminClient();
      const response = await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERS_ID,
        documentId,
        obj
      );

      revalidatePath("/account");
      return response;
    } else {
      const { storage, database } = await createAdminClient();
      const data = await storage.createFile(
        process.env.APPWRITE_BUCKET_ID,
        ID.unique(),
        obj.image
      );
      const fileUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${data.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`;
      const response = await database.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USERS_ID,
        documentId,
        { image: fileUrl }
      );
      revalidatePath("/account");
      return response;
    }
  } catch (error) {
    throw new Error("Error updating document:", error.message);
  }
}

export async function createTransactions(obj) {
  try {
    const { database } = await createAdminClient();
    const newTransaction = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_TRANSACTIONS_ID,
      ID.unique(),
      obj
    );
    revalidatePath("/account");
    revalidatePath("/account/transfer");
    return newTransaction;
  } catch (error) {
    throw new Error("Failed to  Create transaction");
  }
}
export async function createNotification(obj) {
  try {
    const { database } = await createAdminClient();
    const notification = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_NOTIFICATIONS_ID,
      ID.unique(),
      obj
    );
    return notification;
  } catch (err) {
    throw new Error("Failed to Create notification");
  }
}
export async function deleteTransaction(documentId) {
  try {
    const { database } = await createAdminClient();
    const response = await database.deleteDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_TRANSACTIONS_ID,
      documentId
    );
    revalidatePath("/account");
    return response; // Returns a confirmation object
  } catch (error) {
    throw new Error("Error deleting transaction", error);
  }
}
export async function deleteUser(documentId) {
  try {
    const { database } = await createAdminClient();
    const response = await database.deleteDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_USERS_ID,
      documentId
    );
    revalidatePath("/account");
    return response;
  } catch (error) {
    throw new Error("Error deleting transaction", error);
  }
}
export async function deleteBill(documentId) {
  try {
    const { database } = await createAdminClient();
    const response = await database.deleteDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_BILLS_ID,
      documentId
    );
    revalidatePath("/account");
    return response;
  } catch (error) {
    throw new Error("Error deleting transaction", error);
  }
}
export async function getTransactions() {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_TRANSACTIONS_ID
    );
    return response.documents;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}
export async function getNotifications() {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_NOTIFICATIONS_ID
    );
    revalidatePath("/notifications/read");
    return response.documents;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}

export async function getTransaction(id) {
  try {
    const { database } = await createAdminClient();

    const transaction = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_TRANSACTIONS_ID,
      [Query.equal("$id", id)]
    );

    return transaction.documents;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}
export async function getDebitTransaction(id) {
  try {
    const { database } = await createAdminClient();

    const debitTransactions = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_TRANSACTIONS_ID,
      [Query.equal("depId", id)]
    );
    return debitTransactions.documents;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}
export async function getNotificationsByRecieversId(id) {
  try {
    const { database } = await createAdminClient();

    const notifications = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_NOTIFICATIONS_ID,
      [Query.equal("recieverId", id)]
    );

    return notifications.documents;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}
export async function getCreditTransaction(id) {
  try {
    const { database } = await createAdminClient();

    const creditTransactions = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_TRANSACTIONS_ID,
      [Query.equal("credId", id)]
    );
    return creditTransactions.documents;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}
export async function getBills(id) {
  try {
    const { database } = await createAdminClient();

    const bill = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_BILLS_ID,
      [Query.equal("userId", id)]
    );
    return bill.documents;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}

export async function getNotificationsBySendersId(id) {
  try {
    const { database } = await createAdminClient();

    const notifications = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_NOTIFICATIONS_ID,
      [Query.equal("senderId", id)]
    );

    return notifications.documents;
  } catch (error) {
    throw new Error("Failed to fetch", error.message);
  }
}

export async function updateAllNotifications(id, obj) {
  try {
    const databaseId = process.env.APPWRITE_DATABASE_ID;
    const collectionId = process.env.APPWRITE_NOTIFICATIONS_ID;
    const { database } = await createAdminClient();
    const notifications = await Promise.all([
      database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_NOTIFICATIONS_ID,
        [Query.equal("$id", id)]
      ),
      database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_NOTIFICATIONS_ID,
        [Query.equal("$id", id)]
      ),
    ]);
    const [notificationOne, notificationTwo] = notifications;
    [...notificationOne.documents, ...notificationTwo.documents]
      .flat()
      .filter((x) => x.status === false)
      .map(
        async (doc) =>
          await database.updateDocument(databaseId, collectionId, doc.$id, obj)
      );
    revalidatePath("/account");
  } catch (error) {
    throw new Error("Error updating documents:", error);
  }
}
export async function deleteAllNotifications(id) {
  try {
    const databaseId = process.env.APPWRITE_DATABASE_ID;
    const collectionId = process.env.APPWRITE_NOTIFICATIONS_ID;
    const { database } = await createAdminClient();
    const notifications = await Promise.all([
      database.listDocuments(databaseId, collectionId, [
        Query.equal("$id", id),
      ]),
      database.listDocuments(databaseId, collectionId, [
        Query.equal("$id", id),
      ]),
    ]);
    const [notificationOne, notificationTwo] = notifications;
    const documents = [
      ...notificationOne.documents,
      ...notificationTwo.documents,
    ];
    console.log(documents);
    for (const doc of documents) {
      await database.deleteDocument(databaseId, collectionId, doc.$id);
    }
    revalidatePath("/account");
  } catch (error) {
    throw new Error("Error deleting documents:", error);
  }
}
