package com.ssb.arbeidsbenk.model;

public class User
{
    private String username;
    private String passowrdHash;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassowrdHash() {
        return passowrdHash;
    }

    public void setPassowrdHash(String passowrdHash) {
        this.passowrdHash = passowrdHash;
    }
}
