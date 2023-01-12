package connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Map;

public class DatabaseConnection {
    private static Connection connection = null;
//    static Map<String, String> env = System.getenv();

    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        if (connection==null){
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/full-stack-ecommerce#?useSSL=false&useUnicode=yes&characterEncoding=UTF-8&allowPublicKeyRetrieval=true&serverTimezone=UTC", "root", "I@mgre@t1");
            System.out.println("connected");
        }
        return connection;
    }


}
