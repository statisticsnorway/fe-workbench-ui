package com.example.springbootwithreactjs.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class AgentController {

    @RequestMapping(value = "/registerAgent", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public String registerAgents(@RequestBody String payload) {
        System.out.println(payload);
        return "Registered Agent";
    }
}
