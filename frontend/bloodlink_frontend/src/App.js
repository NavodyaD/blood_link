import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [donors, setDonors] = useState([]);
    const [nic, setNic] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [bloodAmount, setBloodAmount] = useState(0);
    const [editNic, setEditNic] = useState("");
    const [filterBloodGroup, setFilterBloodGroup] = useState("");

    // Fetch all donors
    useEffect(() => {
        axios.get("http://localhost:8080/api/donors")
            .then((response) => setDonors(response.data))
            .catch((error) => console.log(error));
    }, []);

    // Add or Update Donor
    const handleSubmit = (e) => {
        e.preventDefault();
        const donor = { nic, contactNumber, bloodGroup, bloodAmount };
        
        if (editNic) {
            // Update donor
            axios.put(`http://localhost:8080/api/donors/${editNic}`, donor)
                .then(() => setDonors(donors.map(d => d.nic === editNic ? donor : d)))
                .catch(error => console.log(error));
        } else {
            // Create donor
            axios.post("http://localhost:8080/api/donors", donor)
                .then(response => setDonors([...donors, response.data]))
                .catch(error => console.log(error));
        }

        // Clear the form
        setNic("");
        setContactNumber("");
        setBloodGroup("");
        setBloodAmount(0);
        setEditNic("");
    };

    // Filter donors by blood group
    const handleFilter = () => {
        axios.get(`http://localhost:8080/api/donors/bloodgroup/${filterBloodGroup}`)
            .then((response) => setDonors(response.data))
            .catch((error) => console.log(error));
    };

    // Set the donor to be edited
    const handleEdit = (nic) => {
        const donor = donors.find(d => d.nic === nic);
        setNic(donor.nic);
        setContactNumber(donor.contactNumber);
        setBloodGroup(donor.bloodGroup);
        setBloodAmount(donor.bloodAmount);
        setEditNic(nic);
    };

    // Delete donor
    const handleDelete = (nic) => {
        axios.delete(`http://localhost:8080/api/donors/${nic}`)
            .then(() => setDonors(donors.filter(d => d.nic !== nic)))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h1>Blood Bank Management</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="NIC"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Blood Group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Blood Amount"
                    value={bloodAmount}
                    onChange={(e) => setBloodAmount(e.target.value)}
                    required
                />
                <button type="submit">{editNic ? "Update Donor" : "Add Donor"}</button>
            </form>

            <div>
                <h2>Filter by Blood Group</h2>
                <input
                    type="text"
                    placeholder="Blood Group"
                    value={filterBloodGroup}
                    onChange={(e) => setFilterBloodGroup(e.target.value)}
                />
                <button onClick={handleFilter}>Filter</button>
            </div>

            <h2>Donors List</h2>
            <ul>
                {donors.map((donor) => (
                    <li key={donor.nic}>
                        {donor.nic} - {donor.contactNumber} - {donor.bloodGroup} - {donor.bloodAmount}ml
                        <button onClick={() => handleEdit(donor.nic)}>Edit</button>
                        <button onClick={() => handleDelete(donor.nic)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
