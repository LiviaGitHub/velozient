import { expect, test } from "@playwright/test";

interface BookingResponse {
  bookingid?: number;
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  email: string;
  phone: string;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function generateFutureDates(): {
  checkin: string;
  checkout: string;
} {
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 30);

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
    const bookingDates = generateFutureDates();

    const bookingPayload = {
      roomid: 1,
      firstname: "Livia",
      lastname: "Bonifacio",
      depositpaid: true,
      email: `livia.api.${Date.now()}@example.com`,
      phone: "07123456789",
      bookingdates: bookingDates,
    };

    const response = await request.post("/api/booking/", {
      data: bookingPayload,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    expect(
      response.status(),
      `Unexpected response body: ${await response.text()}`,
    ).toBe(201);

    const responseBody =
      (await response.json()) as BookingResponse;

    expect(responseBody).toMatchObject({
      roomid: bookingPayload.roomid,
      firstname: bookingPayload.firstname,
      lastname: bookingPayload.lastname,
      depositpaid: bookingPayload.depositpaid,
      email: bookingPayload.email,
      phone: bookingPayload.phone,
      bookingdates: {
        checkin: bookingPayload.bookingdates.checkin,
        checkout: bookingPayload.bookingdates.checkout,
      },
    });

    expect(responseBody.bookingid).toEqual(
      expect.any(Number),
    );
  });
});