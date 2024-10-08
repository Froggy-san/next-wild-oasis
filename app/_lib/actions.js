"use server";

import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const sesstion = await auth();

  // It's a common practice to not use Try and catch declaration. Instead we throw the error only ot be cought by the closest error boundry, which in our case is the error.js in the app file.
  if (!sesstion) throw new Error("You must be logged in.");
  // formData is web api that aslo works on the browser. (Section: Mutation with server action , Video: 3 , at the 16mins mark.)
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", sesstion.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const sesstion = await auth();
  if (!sesstion) throw new Error("You must be logged in");

  // Object.entries(formData.entries())
  const newBooking = {
    ...bookingData,
    guestId: sesstion.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteReservation(bookingId) {
  // This code was for testing what happens when the async function that we pass in the optimistc function fails and what happens to the data after. in the reservationList component.
  // await new Promise((res) => setTimeout((res, 2000)));

  // throw new Error("ERROR");
  const sesstion = await auth();
  if (!sesstion) throw new Error("You must be logged in");

  const guestBookings = await getBookings(sesstion.user.guestId);

  const geustBookingIds = guestBookings.map((booking) => booking.id);

  if (!geustBookingIds.includes(bookingId))
    throw new Error("You aren't allowed to delete this booking.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
