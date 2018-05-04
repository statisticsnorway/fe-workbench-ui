package com.ssb.arbeidsbenk.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoleController {
    private static final Logger logger = LoggerFactory.getLogger(RoleController.class);

    @RequestMapping(value = "/registerRole", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public String registerRole(@RequestBody String payload) {
        logger.debug(payload);
        return "Registered Role";
    }
}
