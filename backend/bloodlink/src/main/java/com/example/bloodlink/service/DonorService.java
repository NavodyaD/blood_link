package com.example.bloodlink.service;

import com.example.bloodlink.entity.Donor;
import com.example.bloodlink.repo.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    // Create a new donor
    public Donor createDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    // Get all donors
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    // Get donors by blood group
    public List<Donor> getDonorsByBloodGroup(String bloodGroup) {
        return donorRepository.findByBloodGroup(bloodGroup);
    }

    // Get donor by NIC
    public Optional<Donor> getDonorByNIC(String nic) {
        return donorRepository.findById(nic);
    }

    // Update donor by NIC
    public Donor updateDonor(String nic, Donor donorDetails) {
        Donor donor = donorRepository.findById(nic)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Donor not found with NIC: " + nic));

        //donor.setContactNumber(donorDetails.getContactNumber());
        //donor.setBloodGroup(donorDetails.getBloodGroup());
        //donor.setBloodAmount(donorDetails.getBloodAmount());

        return donorRepository.save(donor);
    }

    // Delete donor by NIC
    public void deleteDonor(String nic) {
        Donor donor = donorRepository.findById(nic)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Donor not found with NIC: " + nic));
        donorRepository.delete(donor);
    }
}
