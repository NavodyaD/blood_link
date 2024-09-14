package com.example.bloodlink.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Donor {
    @Id
    private String nic; // NIC as the primary key
    private String contactNumber;
    private String bloodGroup;
    private int bloodAmount;
}
