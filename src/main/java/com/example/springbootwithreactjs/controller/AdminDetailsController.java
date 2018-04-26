package com.example.springbootwithreactjs.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminDetailsController {

    private static final Logger logger = LoggerFactory.getLogger(AdminDetailsController.class);

    @RequestMapping(value = "/registerAdminDetails", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders="*")
    public String registerAdminDetails(@RequestBody String payload) {
        logger.debug(payload);
        return "Registered admin details";
    }
}



