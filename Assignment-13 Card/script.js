const data = [
  {
    name: "Aryan Saharan",
    roll: "2201010069",
    program: "B. Tech CSE",
    mobile: "9999058640",
    valid: "2025/08/01",
  },
  {
    name: "Ankit Gupta",
    roll: "2301010253",
    program: "B. Tech CSE",
    mobile: "9876543210",
    valid: "2025/08/01",
  },
  {
    name: "Mohit Wadia",
    roll: "2201010342",
    program: "B. Tech CSE",
    mobile: "945635253232",
    valid: "2025/08/01",
  },
  {
    name: "Rahul Singh",
    roll: "2201010135",
    program: "B. Tech CSE",
    mobile: "9123456780",
    valid: "2025/08/01",
  },
  {
    name: "Priya Sharma",
    roll: "2401010156",
    program: "B. Tech CSE",
    mobile: "9876501234",
    valid: "2025/08/01",
  },
  {
    name: "Rohit Yadav",
    roll: "2201010137",
    program: "B. Tech CSE",
    mobile: "9900112233",
    valid: "2025/08/01",
  },
  {
    name: "Sneha Jha",
    roll: "2201010138",
    program: "B. Tech CSE",
    mobile: "9321456789",
    valid: "2025/08/01",
  },
  {
    name: "Nikhil Bansal",
    roll: "2201010139",
    program: "B. Tech CSE",
    mobile: "9753100246",
    valid: "2025/08/01",
  },
  {
    name: "Tarun Raghav",
    roll: "2201350106",
    program: "B. Tech CSE",
    mobile: "9821412345",
    valid: "2025/08/01",
  },
];

const container = document.getElementById("cardContainer");

data.forEach((student, index) => {
  const card = `
    <div class="id-card">
      <div class="header">
        K.R. MANGALAM <span class="university">UNIVERSITY</span><br />
        <small>THE COMPLETE WORLD OF EDUCATION</small>
      </div>
      <div class="card-body">
        <div class="row">
          <div>
            <strong>Name:</strong> ${student.name}<br />
            <strong>Roll No:</strong> ${student.roll}<br />
            <strong>Program:</strong> ${student.program}<br />
            <strong>Mobile:</strong> ${student.mobile}
        <div class="card-footer">
          Valid Upto: ${student.valid}
        </div>
      </div>
    </div>
  `;
  container.innerHTML += card;
});
