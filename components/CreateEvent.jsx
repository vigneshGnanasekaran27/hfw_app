

import React, { useState } from "react";

export default function CreateEvent() {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_type: "Run",
    level: "Beginner",
    paid: false,
    amount: 0,
    location: "City",
    image: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Event created (UI only, no backend yet)");
    setNewEvent({
      title: "",
      description: "",
      event_type: "Run",
      level: "Beginner",
      paid: false,
      amount: 0,
      location: "City",
      image: "",
      date: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create Event</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input name="title" value={newEvent.title} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Date</label>
          <input name="date" type="date" value={newEvent.date} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Description</label>
          <textarea name="description" value={newEvent.description} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Type</label>
          <select name="event_type" value={newEvent.event_type} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="Run">Run</option>
            <option value="Cycling">Cycling</option>
            <option value="Trekking">Trekking</option>
            <option value="Surfing">Surfing</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Level</label>
          <select name="level" value={newEvent.level} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <select name="location" value={newEvent.location} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="City">City</option>
            <option value="Park">Park</option>
            <option value="Mountain">Mountain</option>
            <option value="Forest">Forest</option>
            <option value="Beach">Beach</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Paid Event?</label>
          <input name="paid" type="checkbox" checked={newEvent.paid} onChange={handleChange} className="mr-2" />
          <span>{newEvent.paid ? "Yes" : "No"}</span>
        </div>
        {newEvent.paid && (
          <div>
            <label className="block font-medium mb-1">Amount (₹)</label>
            <input name="amount" type="number" value={newEvent.amount} onChange={handleChange} min={0} className="w-full border rounded px-3 py-2" />
          </div>
        )}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Image URL</label>
          <input name="image" value={newEvent.image} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">Create</button>
        </div>
      </form>
    </div>
  );
} 