package com.ms.authservice.repository;

import com.ms.authservice.models.ERole;
import com.ms.authservice.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface  RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
