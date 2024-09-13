package com.example.bloodlink.entity;

import jakarta.persistence.Entity;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Entity
@Data
public class Donor {
    @Id
    private String nic; // NIC as the primary key
    private String contactNumber;
    private String bloodGroup;
    private int bloodAmount;

    // Constructors, Getters, and Setters

    // Getter and Setter for contactNumber
    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    // Getter and Setter for bloodGroup
    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    // Getter and Setter for bloodAmount
    public Integer getBloodAmount() {
        return bloodAmount;
    }

    public void setBloodAmount(Integer bloodAmount) {
        this.bloodAmount = bloodAmount;
    }
}
