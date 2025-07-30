package com.example.crudbackend.components;

import com.example.crudbackend.dto.PersonaDTO;
import com.example.crudbackend.entity.PersonaEntity;

public class PersonaMapper {
    
    public static PersonaDTO convertirDTO(PersonaEntity persona){
        PersonaDTO pDTO = new PersonaDTO();
        pDTO.setId(persona.getId());
        pDTO.setName(persona.getName());
        pDTO.setUsername(persona.getUsername());
        pDTO.setEmail(persona.getEmail());
        return pDTO;
    }

    public static PersonaEntity convertirEntity(PersonaDTO persona){
        PersonaEntity pEntity = new PersonaEntity();
        pEntity.setId(persona.getId());
        pEntity.setName(persona.getName());
        pEntity.setEmail(persona.getEmail());
        pEntity.setUsername(persona.getUsername());

        return pEntity;
    }
}
