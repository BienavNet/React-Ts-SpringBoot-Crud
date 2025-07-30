package com.example.crudbackend.dto;

import jakarta.validation.constraints.*;

public class PersonaDTO {

    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String username;

    @Email
    private String email;

    public PersonaDTO() {}

    public PersonaDTO(@NotBlank String name, @NotBlank String username, @NotBlank @Email String email) {
        this.id = null;
        this.name = name;
        this.username = username;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(@NotBlank String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank String username) {
        this.username = username;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(@Email @NotBlank String email) {
        this.email = email;
    }

    

    

}
