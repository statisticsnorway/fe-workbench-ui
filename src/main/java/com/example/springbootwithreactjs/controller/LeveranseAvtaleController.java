package com.example.springbootwithreactjs.controller;

import com.example.springbootwithreactjs.LoginResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;


/**
 */
@RestController
public class LeveranseAvtaleController {

  private static final Logger log = LoggerFactory.getLogger(LeveranseAvtaleController.class);

  @RequestMapping(value = "/register", method = RequestMethod.GET)
  @CrossOrigin(origins = "http://localhost:3000") //TODO change me!
  public String register() {
    return "register";
  }

  @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  @CrossOrigin(origins = "http://localhost:3000") //TODO change me!
  public LoginResponse login(HttpServletResponse response) {
    LoginResponse loginResponse = new LoginResponse();
    loginResponse.setErrors("Invalid credentials");
    response.setStatus(401);
    return loginResponse;
  }
}
