package com.interviewease.interviewease_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("userid")
    private Long userid;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String role;

    // Constructors
    public User() {
    }

    public User(Long userid, String name, String email, String password, String role) {
        this.userid = userid;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters & Setters
    public Long getuserId() {
        return userid;
    }

    public void seusertId(Long id) {
        this.userid = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email.toLowerCase(); // Normalization
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
