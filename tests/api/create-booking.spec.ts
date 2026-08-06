import { expect, test } from "@playwright/test";

interface BookingDates {
  checkin: string;
  checkout: string;
}

interface BookingResponse {
  bookingid?: number;
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  bookingdates: BookingDates;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function generateFutureDates(attempt: number): BookingDates {
  const checkIn = new Date();

  /*
   * Each retry uses a different future period to reduce
   * the risk of selecting dates that are already booked.
   */
  checkIn.setDate(checkIn.getDate() + 30 + attempt * 7);

  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 1);

  return {
    checkin: formatDate(checkIn),
    checkout: formatDate(checkOut),
  };
}

test.describe("Booking API", () => {
  test("API-001 - User can create a booking successfully", async ({
    request,
  }) => {
    const maxAttempts = 10;

    let responseBody: BookingResponse | undefined;
    let createdPayload:
      | {
          roomid: number;
          firstname: string;
          lastname: string;
          depositpaid: boolean;
          email: string;
          phone: string;
          bookingdates: BookingDates;
        }
      | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const bookingDates = generateFutureDates(attempt);

      const bookingPayload = {
        roomid: 1,
        firstname: "Livia",
        lastname: "Bonifacio",
        depositpaid: true,
        email: `livia.api.${Date.now()}@example.com`,
        phone: "07123456789",
        bookingdates: bookingDates,
      };

      console.log(
        `API booking attempt ${attempt}: ${bookingDates.checkin} to ${bookingDates.checkout}`,
      );

      const response = await request.post("/api/booking/", {
        data: bookingPayload,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const responseText = await response.text();

      if (response.status() === 201) {
        responseBody = JSON.parse(
          responseText,
        ) as BookingResponse;

        createdPayload = bookingPayload;

        break;
      }

      if (response.status() === 409) {
        console.log(
          `Dates unavailable. Trying another period. Response: ${responseText}`,
        );

        continue;
      }

      throw new Error(
        `Unexpected status ${response.status()}. Response: ${responseText}`,
      );
    }

    expect(
      responseBody,
      `Booking was not created after ${maxAttempts} attempts.`,
    ).toBeDefined();

    expect(createdPayload).toBeDefined();

    expect(responseBody).toMatchObject({
      roomid: createdPayload!.roomid,
      firstname: createdPayload!.firstname,
      lastname: createdPayload!.lastname,
      depositpaid: createdPayload!.depositpaid,
      bookingdates: {
        checkin: createdPayload!.bookingdates.checkin,
        checkout: createdPayload!.bookingdates.checkout,
      },
    });

    expect(responseBody!.bookingid).toEqual(
      expect.any(Number),
    );
  });
});