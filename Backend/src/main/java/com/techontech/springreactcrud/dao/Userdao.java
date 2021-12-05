package com.techontech.springreactcrud.dao;

import com.techontech.springreactcrud.beans.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Userdao extends JpaRepository<User, Integer> {

}
