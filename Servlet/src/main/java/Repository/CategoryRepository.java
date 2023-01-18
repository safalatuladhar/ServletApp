package Repository;

import connection.DatabaseConnection;
import model.Category;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CategoryRepository {

    public List<Category> getAllCategories() {
        List<Category> categories = new ArrayList<>();

        Connection connection = DatabaseConnection.getConnection();
        try {

            Statement statement = connection.createStatement();

            String query = "SELECT * FROM product_category";

            ResultSet resultSet = statement.executeQuery(query);

            while (resultSet.next()) {
                Long id = resultSet.getLong("id");
                String category_name = resultSet.getString("category_name");
                categories.add(new Category(id, category_name));
            }
        } catch (SQLException e) {
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }

        return categories;
    }

    public Category addCategory(Category category) {

        Connection connection = DatabaseConnection.getConnection();
        try{

            String query = "INSERT INTO product_category(id, category_name) VALUES(?,?)";

            PreparedStatement pst = connection.prepareStatement(query);

            Long id = category.getId();
            String category_name = category.getcategoryName();

            pst.setLong(1, id);
            pst.setString(2, category_name);
            pst.executeUpdate();
        }catch (SQLException e){
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }

        return category;

    }

    public Category updateCategory(Category category)  {
        Connection connection = DatabaseConnection.getConnection();
        try{

            String query = "UPDATE product_category set category_name = ? WHERE id = ? ";

            PreparedStatement pst = connection.prepareStatement(query);

            Long id = category.getId();
            String category_name = category.getcategoryName();

            pst.setString(1, category_name);
            pst.setLong(2, id);
            pst.executeUpdate();
        }catch (SQLException e){
            System.out.println(e);
        }

        return category;
    }

    public void deleteCategory(int id)  {

        Connection connection = DatabaseConnection.getConnection();
        try{

            String query = "DELETE FROM product_category WHERE id = ? ";

            PreparedStatement pst = connection.prepareStatement(query);

            pst.setLong(1, id);
            pst.executeUpdate();
        }catch (SQLException e){
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }


    }
}
