package Service;

import DTO.ResponseDTO;
import Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import model.User;
import utility.JwtUtilty;

import java.sql.SQLException;
import java.util.List;

public class UserService {

    private UserRepository userRepository = new UserRepository();
    private JwtUtilty jwtUtilty = new JwtUtilty();

    public ResponseDTO loadUserByUsername(HttpServletRequest request) throws SQLException, ClassNotFoundException {

        User user = userRepository.findByUsername(request);

        if (user != null) {
            String token = jwtUtilty.generateToken(user);
            return new ResponseDTO(token, user);

        } else {
            return null;
        }

    }

    public List<String> getRolesByUsername(String username)  {
        return UserRepository.getRolesByUsername(username);
    }
}
