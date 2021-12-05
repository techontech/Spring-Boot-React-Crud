package com.techontech.springreactcrud.dto;

import java.util.Date;

import com.techontech.springreactcrud.beans.User;

import org.springframework.beans.BeanUtils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Userdto {
    private int id;

    private String name;

    private String email;

    private String description;

    private Date created_at;

    private Date updated_at;

    private int age;

    /**
     * @param name
     * @param email
     * @param description
     * @param age
     */
    public Userdto(String name, String email, String description, int age) {
        this.name = name;
        this.email = email;
        this.description = description;
        this.age = age;
    }

    /**
     * @param name
     * @param email
     * @param description
     * @param created_at
     * @param updated_at
     * @param age
     */
    public Userdto(String name, String email, String description, Date created_at, Date updated_at, int age) {
        this.name = name;
        this.email = email;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.age = age;
    }

    public static Userdto fromEntity(User b) {
        Userdto dto = new Userdto();
        BeanUtils.copyProperties(b, dto);
        dto.setId(b.getId());
        return dto;
    }

    public static User toEntity(Userdto dto) {
        User u = new User();
        BeanUtils.copyProperties(dto, u);
        u.setId(dto.getId());
        return u;
    }

}
