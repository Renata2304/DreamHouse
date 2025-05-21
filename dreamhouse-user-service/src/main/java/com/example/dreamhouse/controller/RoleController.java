package com.example.dreamhouse.controller;

import com.example.dreamhouse.service.RoleService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/role")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*")
public class RoleController {

    private static final Logger logger = LoggerFactory.getLogger(RoleController.class);

    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @RequestMapping(path = "/add", method = RequestMethod.POST)
    @PreAuthorize("hasRole('client_admin')")
    public ResponseEntity<?> addRoles(@RequestBody List<String> roleList) {
        logger.info("Request to add roles {}", roleList);
        List<String> addedRoles = roleService.addRoles(roleList);
        logger.info("Successfully added roles {}", addedRoles);
        return new ResponseEntity<>(addedRoles, HttpStatus.CREATED);
    }
}
