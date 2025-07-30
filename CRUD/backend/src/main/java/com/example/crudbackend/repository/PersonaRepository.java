package com.example.crudbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.crudbackend.entity.PersonaEntity;

@Repository
public interface PersonaRepository extends JpaRepository<PersonaEntity, Long> {
    
}
