package org.entretien.entretienService;

import org.entretien.entretienService.model.Entretien;
import org.entretien.entretienService.service.EntretienService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/entretien")
public class EntretienResource {
    private final EntretienService entretienService;

    public EntretienResource(EntretienService entretienService) {
        this.entretienService = entretienService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Entretien>> getAllEntretiens() {
        List<Entretien> entretiens = entretienService.getAllEntretiens();
        return new ResponseEntity<>(entretiens, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Entretien> getOneEntretien(@PathVariable("id") Long id) {
        Entretien entretien = entretienService.getOneEntretienById(id);
        return new ResponseEntity<>(entretien,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Entretien> addEntretien(@RequestBody Entretien entretien) {
        Entretien entretien1 = entretienService.addEntretien(entretien);
        return new ResponseEntity<>(entretien1,HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Entretien> updateEntretien(@RequestBody Entretien entretien) {
        Entretien entretien1 = entretienService.updateEntretien(entretien);
        return new ResponseEntity<>(entretien1,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Entretien> deleteEntretien(@PathVariable("id") Long id) {
        entretienService.deleteEntretien(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
