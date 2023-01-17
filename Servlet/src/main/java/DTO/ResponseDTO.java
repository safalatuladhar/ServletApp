package DTO;

import model.User;

import java.util.List;

public class ResponseDTO {
    private String token;
    private User user;

    private List<String> role;

    public ResponseDTO(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public ResponseDTO(String token, User user, List<String> role) {
        this.token = token;
        this.user = user;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<String> getRole() {
        return role;
    }

    public void setRole(List<String> role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "ResponseDTO{" +
                "token='" + token + '\'' +
                ", user=" + user +
                ", role=" + role +
                '}';
    }
}
