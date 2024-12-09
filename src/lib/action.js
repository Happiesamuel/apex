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
    return parseStringify(response.documents);
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
    console.log(newUser, "samfxh");
    return parseStringify(newUser);
  } catch (error) {
    console.log(error);
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
    return parseStringify(user.documents.at(0));
  } catch (error) {
    console.log(error);
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
    return parseStringify(user.documents.at(0));
  } catch (error) {
    console.log(error);
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
      return parseStringify(response);
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
      return parseStringify(response);
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
    return parseStringify(newTransaction);
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
    return parseStringify(notification);
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
  console.log(documentId);
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
export async function getTransactions() {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_TRANSACTIONS_ID
    );
    return parseStringify(response.documents);
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
    return parseStringify(response.documents);
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

    return parseStringify(transaction.documents);
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
    return parseStringify(debitTransactions.documents);
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

    return parseStringify(notifications.documents);
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
    return parseStringify(creditTransactions.documents);
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

    return parseStringify(notifications.documents);
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

export async function handleRecievePay(user) {
  try {
    await Promise.all([
      updateUser(user["$id"], {
        totalBalance: 500,
        welcomePay: true,
      }),
      createNotification({
        title: "Welcome",
        message: `You've been credited $500 to start banking with us...You can transfer as well as pay some of your bills on Apex bank online and also request for loan if you need to pay or transfer urgently!`,
        senderName: "Apex",
        image: apexLogo.src,
        status: false,
        senderId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        recieverId: user["$id"],
        recieverName: user.fullName,
      }),
    ]);
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
    // Toast({ description: "failed to claim", title: "Claiming failed" });
  }
}
