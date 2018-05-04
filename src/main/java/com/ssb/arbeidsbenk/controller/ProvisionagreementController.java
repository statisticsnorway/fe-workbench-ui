package com.ssb.arbeidsbenk.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProvisionagreementController {
    private static final Logger logger = LoggerFactory.getLogger(ProvisionagreementController.class);

    @RequestMapping(value = "/registerProvisionagreement", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public String registerAgents(@RequestBody String payload) {
        logger.debug(payload);
        return "Registered provisionagreement";
    }
}
