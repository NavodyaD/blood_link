import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

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
        const fetchDonors = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/donors");
                setDonors(response.data);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchDonors();
    }, []);
    

    // Add or Update Donor
    const handleSubmit = async (e) => {
        e.preventDefault();
        const donor = { nic, contactNumber, bloodGroup, bloodAmount };

        try {
            if (editNic) {
                // Update donor
                await axios.put(`http://localhost:8080/api/donors/${editNic}`, donor);
                setDonors(donors.map(donorItem => donorItem.nic === editNic ? donor : donorItem));
            } else {
                // Create donor
                const response = await axios.post("http://localhost:8080/api/donors/createdonor", donor);
                setDonors([...donors, response.data]);
            }
        } catch (error) {
            console.error(error);
        }

        // Clear the form
        setNic("");
        setContactNumber("");
        setBloodGroup("");
        setBloodAmount(0);
        setEditNic("");
    };


    // Filter donors by blood group
    const handleFilter = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/donors/bloodgroup/${filterBloodGroup}`);
            setDonors(response.data);
        } catch (error) {
            console.error(error);
        }
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

    const handleDelete = async (nic) => {
        try {
            await axios.delete(`http://localhost:8080/api/donors/${nic}`);
            setDonors(donors.filter(donorItem => donorItem.nic !== nic));
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div className="mainConatiner">
            <h1>Blood Bank Management</h1>
            <div className="addFormDiv">
                
            <form className="addForm" onSubmit={handleSubmit}>
            <h2>Add New Donation</h2>
                <div className="textField">
                    <p>NIC</p>
                <input
                    type="text"
                    placeholder="NIC"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    required
                />
                </div>
                <div className="textField">
                    <p>Conact Number</p>
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                />
                </div>
                <div className="textField">
                    <p>Blood Group</p>
                <input
                    type="text"
                    placeholder="Blood Group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                />
                </div>
                <div className="textField">
                    <p>Blood Amount</p>
                <input
                    type="number"
                    placeholder="Blood Amount"
                    value={bloodAmount}
                    onChange={(e) => setBloodAmount(e.target.value)}
                    required
                />
                </div>
                <button className="button" type="submit">{editNic ? "Update Donor" : "Add Donor"}</button>
            </form>
            </div>

            <div className="filter">
                <h2>Filter by Blood Group</h2>
                <div className="textField">
                    <p>Enter Blood Group</p>
                    <br />
                <input
                    type="text"
                    placeholder="Blood Group"
                    value={filterBloodGroup}
                    onChange={(e) => setFilterBloodGroup(e.target.value)}
                />
                </div>
                <button className="button" onClick={handleFilter}>Filter</button>
            </div>

            <h2>Donors List</h2>
            <ul className="donorslist">
                {donors.map((donor) => (
                    <li key={donor.nic}>
                        {donor.nic} - {donor.contactNumber} - {donor.bloodGroup} - {donor.bloodAmount}ml
                        <button onClick={() => handleEdit(donor.nic)}>Edit Donor</button>
                        <button onClick={() => handleDelete(donor.nic)}>Delete Donor</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
