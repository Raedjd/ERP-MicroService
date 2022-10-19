package org.entretien.entretienService.repository;

import org.entretien.entretienService.model.Entretien;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntretienRepository extends JpaRepository<Entretien,Long> {
}
