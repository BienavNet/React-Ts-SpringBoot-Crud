package com.example.crudbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.crudbackend.entity.PersonaEntity;
import com.example.crudbackend.repository.PersonaRepository;

@Service
public class PersonaService  {

    @Autowired
    private PersonaRepository personaRepository;

    public List<PersonaEntity> obtenerPersonas(){
        return personaRepository.findAll();
    }

    public Optional<PersonaEntity> obtenerPersonaPorId(Long id){
        return personaRepository.findById(id);
    }

    public PersonaEntity guardarPersona(PersonaEntity persona){
        return personaRepository.save(persona);
    }

    public PersonaEntity actualizarPersona(Long id, PersonaEntity persona) {
        return personaRepository.findById(id)
            .map(personaEncontrada -> {
                personaEncontrada.setName(persona.getName());
                personaEncontrada.setUsername(persona.getUsername());
                personaEncontrada.setEmail(persona.getEmail());

                return personaRepository.save(personaEncontrada);
            }).orElseThrow(() -> new RuntimeException("No se encontró la persona con ID:" + id));
    }

    public PersonaEntity actualizarEstado(Long id, boolean isActive){
        return personaRepository.findById(id)
            .map( personaEncontrada -> {
                personaEncontrada.setActive(isActive);
                return personaRepository.save(personaEncontrada);
            }).orElseThrow(() -> new RuntimeException("No existe una persona con el ID: " + id));
    }

    public void eliminarPersona(Long id) {
        personaRepository.deleteById(id);
    }
}
