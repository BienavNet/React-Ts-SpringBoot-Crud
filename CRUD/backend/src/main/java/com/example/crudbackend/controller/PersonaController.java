package com.example.crudbackend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crudbackend.components.PersonaMapper;
import com.example.crudbackend.dto.PersonaDTO;
import com.example.crudbackend.entity.PersonaEntity;
import com.example.crudbackend.service.PersonaService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;








@RestController
@RequestMapping(path = "/personas")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    @GetMapping("/")
    public ResponseEntity<List<PersonaDTO>> listar() {
        List<PersonaEntity> personas = personaService.obtenerPersonas();
        return new ResponseEntity<>(personas.stream().map(PersonaMapper::convertirDTO).collect(Collectors.toList()), null, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonaDTO> obtenerPersona(@PathVariable("id") Long id) {
        Optional<PersonaEntity> persona = personaService.obtenerPersonaPorId(id);

        if (!persona.isPresent()){
            return new ResponseEntity<>(null, null, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(PersonaMapper.convertirDTO(persona.get()), null, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<PersonaDTO> crearPersona(@RequestBody PersonaDTO persona) {
        
        PersonaEntity p = personaService.guardarPersona(PersonaMapper.convertirEntity(persona));
        return new ResponseEntity<>(PersonaMapper.convertirDTO(p), null, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PersonaDTO> actualizarPersona(@PathVariable("id") Long id, @RequestBody PersonaDTO persona) {
        
        PersonaEntity p = personaService.actualizarPersona(id, PersonaMapper.convertirEntity(persona));

        return new ResponseEntity<>(PersonaMapper.convertirDTO(p), null, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> requestMethodName(@PathVariable("id") Long id) {
        personaService.eliminarPersona(id);

        return ResponseEntity.noContent().build();

    }

}
