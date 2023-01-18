package Repository;

import connection.DatabaseConnection;
import jakarta.servlet.http.HttpServletRequest;
import model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserRepository {
    public static List<String> getRolesByUsername(String username)  {
        Connection connection = DatabaseConnection.getConnection();
        String query = "select r.role from user_role usr join " +
                "users u on usr.user_id = u.id join " +
                "role r on usr.role_id = r.id where u.user_name = '" +  username + "'";

        List<String> roles = new ArrayList<>();

        try {

            PreparedStatement pst = connection.prepareStatement(query);
            ResultSet rs = pst.executeQuery();

            while (rs.next()) {
                roles.add(rs.getString("role"));
            }
        }catch (SQLException e){
            System.out.println(e);
        }finally {
            if (connection != null){
                try {
                    connection.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        return roles;
    }

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

