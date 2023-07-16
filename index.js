const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

// Helper functions
function createEmployeeRecord(employeeData) {
  const [firstName, familyName, title, payPerHour] = employeeData;
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(employeeData => createEmployeeRecord(employeeData));
}

function createTimeInEvent(dateStamp) {
  if (!dateStamp || typeof dateStamp !== "string") {
    throw new Error("Invalid dateStamp");
  }

  const [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });

  return this;
}

function createTimeOutEvent(dateStamp) {
  if (!dateStamp || typeof dateStamp !== "string") {
    throw new Error("Invalid dateStamp");
  }

  const [date, hour] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });

  return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100; // Convert to hours
      return hoursWorked;
    }
  
    return 0;
  }
  

function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  const payRate = this.payPerHour;
  const wagesEarned = hoursWorked * payRate;

  return wagesEarned;
}

function allWagesFor() {
  const datesWorked = this.timeInEvents.map(event => event.date);
  const totalWages = datesWorked.reduce(
    (total, date) => total + wagesEarnedOnDate.call(this, date),
    0
  );

  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(
    (totalPayroll, employeeRecord) =>
      totalPayroll + allWagesFor.call(employeeRecord),
    0
  );
}

// Test cases
describe("The payroll system", function () {
  // Rest of the test cases
});

// Export the functions to be used in the test cases
module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  findEmployeeByFirstName,
  calculatePayroll
};
