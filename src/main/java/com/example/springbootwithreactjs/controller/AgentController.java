package com.example.springbootwithreactjs.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
public class AgentController {

  private static final Logger logger = LoggerFactory.getLogger(AgentController.class);

  @RequestMapping(value = "/registerAgent", method = RequestMethod.POST)
  @CrossOrigin(origins = "http://localhost:3000")
  public String registerAgent(@RequestBody String payload) {
    logger.debug(payload);
    return "Registered Agent";
  }
}
