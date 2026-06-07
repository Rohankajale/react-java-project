package com.example.userService;

import com.example.userEntity.User;
import com.example.userRepository.DemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DemoService {

    @Autowired
    private DemoRepository demoRepository;

    public User createUser(User user) {
        return demoRepository.save(user);
    }

    public List<User> getAllUsers() {
        return demoRepository.findAll();
    }

    public User getUserById(Long id) {
        return demoRepository.findById(id).orElse(null);
    }

    public User updateUser(Long id, User user) {
        user.setId(id);
        return demoRepository.save(user);
    }

    public void deleteUser(Long id) {
        demoRepository.deleteById(id);
    }
}
