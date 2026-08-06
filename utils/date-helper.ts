export interface BookingDates {
  checkIn: string;
  checkOut: string;
}

export function generateFutureBookingDates(): BookingDates {
  const checkIn = new Date();

  // Random check-in between 7 and 90 days from today
  checkIn.setDate(checkIn.getDate() + randomNumber(7, 90));

  const checkOut = new Date(checkIn);

  // Random stay between 1 and 5 nights
  checkOut.setDate(checkOut.getDate() + randomNumber(1, 5));

  return {
    checkIn: formatDate(checkIn),
    checkOut: formatDate(checkOut),
  };
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}