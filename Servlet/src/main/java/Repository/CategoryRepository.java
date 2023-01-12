package Repository;

import connection.DatabaseConnection;
import model.Category;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CategoryRepository {

    public List<Category> getAllCategories() throws SQLException, ClassNotFoundException {
        List<Category> categories = new ArrayList<>();

        Connection connection = DatabaseConnection.getConnection();

        Statement statement = connection.createStatement();

        String query = "SELECT * FROM product_category";

        ResultSet resultSet = statement.executeQuery(query);

        while (resultSet.next()) {
            Long id = resultSet.getLong("id");
            String category_name = resultSet.getString("category_name");
            categories.add(new Category(id, category_name));
        }
        return categories;
    }

    public Category addCategory(Category category) throws SQLException, ClassNotFoundException {

        Connection connection = DatabaseConnection.getConnection();

        String query = "INSERT INTO product_category(id, category_name) VALUES(?,?)";

        PreparedStatement pst = connection.prepareStatement(query);

        Long id = category.getId();
        String category_name = category.getcategoryName();

        pst.setLong(1, id);
        pst.setString(2,category_name);
        pst.executeUpdate();

        return category;

    }

    public Category updateCategory(Category category) throws SQLException, ClassNotFoundException {
        Connection connection = DatabaseConnection.getConnection();

        String query = "UPDATE product_category set category_name = ? WHERE id = ? ";

        PreparedStatement pst = connection.prepareStatement(query);

        Long id = category.getId();
        String category_name = category.getcategoryName();

        pst.setString(1,category_name);
        pst.setLong(2, id);
        pst.executeUpdate();

        return category;
    }

    public void deleteCategory(int id) throws SQLException, ClassNotFoundException {

        Connection connection = DatabaseConnection.getConnection();

        String query = "DELETE FROM product_category WHERE id = ? ";

        PreparedStatement pst = connection.prepareStatement(query);

        pst.setLong(1, id);
        pst.executeUpdate();

    }
}
