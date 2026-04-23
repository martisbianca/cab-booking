import { useState } from "react";

function App() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [vehicle, setVehicle] = useState("Mini");
  const [bookings, setBookings] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("");

  // price function
  function getPrice(type) {
    let base = 50;
    let rate = 10;

    if (type === "Mini") return base + 5 * rate;
    if (type === "Sedan") return base + 10 * rate;
    if (type === "SUV") return base + 15 * rate;
  }

  // add booking
  function addBooking() {
    if (pickup === "" || drop === "" || dateTime === "") {
      alert("Fill all fields");
      return;
    }

    if (new Date(dateTime) <= new Date()) {
      alert("Enter future date");
      return;
    }

    let newData = {
      id: Date.now(),
      pickup: pickup,
      drop: drop,
      dateTime: dateTime,
      vehicle: vehicle,
      price: getPrice(vehicle),
      status: "Pending",
    };

    setBookings([...bookings, newData]);

    setPickup("");
    setDrop("");
    setDateTime("");
    setVehicle("Mini");
  }

  // change status
  function changeStatus(id, type) {
    let updated = bookings.map((b) => {
      if (b.id === id) {
        if (type === "confirm") b.status = "Confirmed";
        if (type === "complete") b.status = "Completed";
        if (type === "reject") b.status = "Rejected";
      }
      return b;
    });

    setBookings(updated);
  }

  // filter
  let data = bookings.filter((b) => {
    return (
      (statusFilter === "" || b.status === statusFilter) &&
      (vehicleFilter === "" || b.vehicle === vehicleFilter)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cab Booking</h2>

      <input
        placeholder="Pickup"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Drop"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
      />
      <br /><br />

      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
      <br /><br />

      <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
        <option>Mini</option>
        <option>Sedan</option>
        <option>SUV</option>
      </select>
      <br /><br />

      <button onClick={addBooking}>Book</button>

      <hr />

      <h3>Filter</h3>

      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All Status</option>
        <option>Pending</option>
        <option>Confirmed</option>
        <option>Completed</option>
        <option>Rejected</option>
      </select>

      <select onChange={(e) => setVehicleFilter(e.target.value)}>
        <option value="">All Vehicles</option>
        <option>Mini</option>
        <option>Sedan</option>
        <option>SUV</option>
      </select>

      <button onClick={() => {
        setStatusFilter("");
        setVehicleFilter("");
      }}>
        Reset
      </button>

      <hr />

      <h3>Bookings</h3>

      {data.map((b) => (
        <div key={b.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p>{b.pickup} → {b.drop}</p>
          <p>{b.dateTime}</p>
          <p>{b.vehicle}</p>
          <p>₹{b.price}</p>
          <p>{b.status}</p>

          {b.status === "Pending" && (
            <>
              <button onClick={() => changeStatus(b.id, "confirm")}>Confirm</button>
              <button onClick={() => changeStatus(b.id, "reject")}>Reject</button>
            </>
          )}

          {b.status === "Confirmed" && (
            <button onClick={() => changeStatus(b.id, "complete")}>Complete</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;