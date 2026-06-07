package com.example.userController;

import com.example.userEntity.User;
import com.example.userService.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class DemoController {

    @Autowired
    private DemoService demoService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return demoService.createUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return demoService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return demoService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return demoService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        demoService.deleteUser(id);
    }
}
