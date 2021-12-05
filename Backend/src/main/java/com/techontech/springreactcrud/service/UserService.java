package com.techontech.springreactcrud.service;

import java.util.List;
import java.util.Optional;

import com.techontech.springreactcrud.beans.User;
import com.techontech.springreactcrud.dao.Userdao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private Userdao userdao;

    public User save(User u) {
        User u1 = userdao.save(u);
        return u1;
    }

    public List<User> show() {
        return userdao.findAll();
    }

    public Optional<User> find(int id) {
        return userdao.findById(id);
    }

    public void delete(int id) {
        userdao.deleteById(id);
    }

    public User update(User u) {
        return userdao.save(u);
    }

}
