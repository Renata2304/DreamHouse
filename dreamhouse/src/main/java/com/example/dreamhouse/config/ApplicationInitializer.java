package com.example.dreamhouse.config;

import com.example.dreamhouse.entity.Role;
import com.example.dreamhouse.entity.User;
import com.example.dreamhouse.repository.RoleRepository;
import com.example.dreamhouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;

@Component
public class ApplicationInitializer implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Value("${admin.username}")
    private String adminUsername;
    @Value("${admin.password}")
    private String adminPassword;
    @Value("${admin.email}")
    private String adminEmail;

    public ApplicationInitializer(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Optional<User> admin = userRepository.findUserByEmail(adminEmail);
        if (admin.isEmpty()) {
            List<Role> roleList = new ArrayList<>();

            Optional<Role> adminRole = roleRepository.findRoleByName("ADMIN");
            if (adminRole.isEmpty()) {
                throw new RuntimeException("Admin role not found in the database!");
            }

            roleList.add(adminRole.get());
            User initAdmin = new User()
                    .setUsername(adminUsername)
                    .setEmail(adminEmail)
                    .setPassword(passwordEncoder.encode(adminPassword))
                    .setRoles(roleList);
            userRepository.save(initAdmin);
        }

    }
}
