package com.example.bloodlink.controller;

import com.example.bloodlink.entity.Donor;
import com.example.bloodlink.repo.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;




@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to access the API

public class DonorController {

    @Autowired
    private DonorRepository donorRepository;

    // Create a new donor
    @PostMapping
    public Donor createDonor(@RequestBody Donor donor) {
        return donorRepository.save(donor);
    }

    // Get all donors
    @GetMapping
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    // Get donors by blood group
    @GetMapping("/bloodgroup/{bloodGroup}")
    public List<Donor> getDonorsByBloodGroup(@PathVariable String bloodGroup) {
        return donorRepository.findByBloodGroup(bloodGroup);
    }

    // Update donor by NIC
    @PutMapping("/{nic}")
    public ResponseEntity<Donor> updateDonor(@PathVariable String nic, @RequestBody Donor donorDetails) {
        Donor donor = donorRepository.findById(nic)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with NIC: " + nic));

        donor.setContactNumber(donorDetails.s());
        donor.setBloodGroup(donorDetails.getBloodGroup());
        donor.setBloodAmount(donorDetails.getBloodAmount());

        Donor updatedDonor = donorRepository.save(donor);
        return ResponseEntity.ok(updatedDonor);
    }

    // Delete donor by NIC
    @DeleteMapping("/{nic}")
    public ResponseEntity<Map<String, Boolean>> deleteDonor(@PathVariable String nic) {
        Donor donor = donorRepository.findById(nic)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with NIC: " + nic));

        donorRepository.delete(donor);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
