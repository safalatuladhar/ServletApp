package controller;

import DTO.ResponseDTO;
import Service.AuthService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/auth")

public class AuthController extends HttpServlet {
    private AuthService authService = new AuthService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response){
       // ResponseDTO responseDTO =  authService.login(request);

        String requestType = request.getParameter("type");
        if (requestType.equals("login")){

        }

    }
}
