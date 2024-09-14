package com.example.bloodlink.controller;

import com.example.bloodlink.entity.Donor;
import com.example.bloodlink.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to access the API
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping("/createdonor")
    public Donor createDonor(@RequestBody Donor donor) {
        return donorService.createDonor(donor);
    }

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }

    @GetMapping("/bloodgroup/{bloodGroup}")
    public List<Donor> getDonorsByBloodGroup(@PathVariable String bloodGroup) {
        return donorService.getDonorsByBloodGroup(bloodGroup);
    }

    @PutMapping("/{nic}")
    public ResponseEntity<Donor> updateDonor(@PathVariable String nic, @RequestBody Donor donorDetails) {
        Donor updatedDonor = donorService.updateDonor(nic, donorDetails);
        return ResponseEntity.ok(updatedDonor);
    }

    @DeleteMapping("/{nic}")
    public ResponseEntity<Map<String, Boolean>> deleteDonor(@PathVariable String nic) {
        donorService.deleteDonor(nic);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
