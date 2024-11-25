function jsonConcat(o1, o2) {
  for (var key in o2) {
    o1[key] = o2[key];
  }
  return o1;
}

const base = {
  headers: {
    "Content-Type": "application/json",
  },
};

const server = {
  baseURL: "http://localhost:8000/",
};

const config = jsonConcat(base, server);
const combine = {
  createEvent: config.baseURL + "upcoming-event",
  eventCategory: config.baseURL + "event-category",
  eventList: config.baseURL + "event-list",
  eventById: config.baseURL + "eventById",
  bookingList: config.baseURL + "booking-list",
  customerList: config.baseURL + "customer-list",
  transactionList: config.baseURL + "stripe-payment",
  dashboardList:config.baseURL + "dashboard",
  totalEventDashboard:config.baseURL + "total-events",
  salesRevenue:config.baseURL + "sales-events",
  upcomingList:config.baseURL + "upcoming-list",
  dashboardlogin:config.baseURL + "dashboard-login",
  refreshTokenUrl:config.baseURL + "refresh-token",




};

export default jsonConcat(config, combine);