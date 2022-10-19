package org.entretien.entretienService.service;

import org.entretien.entretienService.model.Entretien;
import org.entretien.entretienService.repository.EntretienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntretienService {
    private final EntretienRepository entretienRepository;

    @Autowired
    public EntretienService(EntretienRepository entretienRepository) {
        this.entretienRepository = entretienRepository;
    }

    public Entretien addEntretien(Entretien entretien) {
        return entretienRepository.save(entretien);
    }
    public List<Entretien> getAllEntretiens() {
        return entretienRepository.findAll();
    }

    public Entretien updateEntretien(Entretien entretien) {
        return entretienRepository.save(entretien);
    }

    public Entretien getOneEntretienById(Long id) {
        return entretienRepository.findById(id).orElse(null);
    }

    public void deleteEntretien(Long id) {
        entretienRepository.deleteById(id);
    }
}
