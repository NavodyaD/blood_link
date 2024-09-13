package com.example.bloodlink.repo;

import com.example.bloodlink.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonorRepository extends JpaRepository<Donor, String> {
    List<Donor> findByBloodGroup(String bloodGroup); // Custom query for blood group
}
