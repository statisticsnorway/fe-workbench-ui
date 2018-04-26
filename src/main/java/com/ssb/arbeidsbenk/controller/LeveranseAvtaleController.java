package com.ssb.arbeidsbenk.controller;

import com.ssb.arbeidsbenk.LoginResponse;
import com.ssb.arbeidsbenk.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;


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
  public @ResponseBody User login(@RequestBody Map<String,Object> credentials, HttpServletResponse response) {
    User user = new User();
    Map<String,String> loginCredentials = (Map<String, String>) credentials.get("credentials");
    for (Map.Entry<String, String> entry : loginCredentials.entrySet()) {
      if(entry.getKey().equals("email")){
        user.setUsername( entry.getValue());
      }
      if(entry.getKey().equals("password")){
        user.setPassowrdHash( entry.getValue());
      }
    }
    return user;
  }
}
