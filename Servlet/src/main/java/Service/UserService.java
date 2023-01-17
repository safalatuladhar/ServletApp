package Service;

import DTO.ResponseDTO;
import Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import model.User;
import utility.UserUtilty;

import java.sql.SQLException;

public class UserService {

    private UserRepository userRepository = new UserRepository();
    private UserUtilty userUtilty = new UserUtilty();

    public ResponseDTO loadUserByUsername(HttpServletRequest request) throws SQLException, ClassNotFoundException {

        User user = userRepository.findByUsername(request);

        if (user != null) {
            String token = userUtilty.generateToken(user);
            return new ResponseDTO(token, user);

        } else {
            return null;
        }

    }
}
