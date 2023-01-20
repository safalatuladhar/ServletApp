package Service;

import DTO.ResponseDTO;
import Repository.UserRepository;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import model.User;
import utility.JwtUtilty;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public class UserService {

    private UserRepository userRepository = new UserRepository();
    private JwtUtilty jwtUtilty = new JwtUtilty();

    public ResponseDTO loadUserByUsername(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        Gson gson = new Gson();
        User loginUser = gson.fromJson(request.getReader().readLine(), User.class);
        User user = userRepository.findByUsername(loginUser);
        if (user == null) {
            return null;
        }
        List<String> userRoles = userRepository.getRolesByUsername(user.getUsername());
        user.setRoles(userRoles);
        String token = jwtUtilty.generateToken(user);
        return new ResponseDTO(token, user);
    }

    public List<String> getRolesByUsername(String username) {
        return userRepository.getRolesByUsername(username);
    }
}
