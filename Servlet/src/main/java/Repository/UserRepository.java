package Repository;

import connection.DatabaseConnection;
import jakarta.servlet.http.HttpServletRequest;
import model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRepository {
    public User findByUsername(HttpServletRequest request) throws SQLException, ClassNotFoundException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        Connection connection = DatabaseConnection.getConnection();
        String query = "SELECT * from users where user_name = ? and password = ?";
        PreparedStatement pst = connection.prepareStatement(query);
        pst.setString(1, username);
        pst.setString(2, password);

        ResultSet rs = pst.executeQuery();
       // rs.next();
        if (rs.next()) {
            return new User(
                    rs.getLong("id"),
                    rs.getString("first_name"),
                    rs.getString("last_name"),
                    rs.getString("user_name"),
                    rs.getString("password")
            );
        } else {
            return null;
        }

    }
}

