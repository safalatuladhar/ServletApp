package Repository;

import connection.DatabaseConnection;
import model.Product;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductRepository {

    public List<Product> getAllProducts() throws SQLException, ClassNotFoundException {

        List<Product> products = new ArrayList<>();

        Connection connection = DatabaseConnection.getConnection();

        Statement statement = connection.createStatement();

        String query = "SELECT p.id, p.sku, p.name,p.description,p.active, p.unit_price, p.image_url, p.units_in_stock, c.id as category_id, c.category_name as category_name FROM product p INNER JOIN product_category c on p.category_id = c.id LIMIT 10";
//        String query = "SELECT * FROM product";

        ResultSet resultSet = statement.executeQuery(query);

        while (resultSet.next()) {
            Long id = resultSet.getLong("id");
            String sku = resultSet.getString("sku");
            String name = resultSet.getString("name");
            String description = resultSet.getString("category_name");
            int category_id = resultSet.getInt("category_id");
            BigDecimal unit_price = resultSet.getBigDecimal("unit_price");
            String image_url = resultSet.getString("image_url");
            Boolean active = resultSet.getBoolean("active");
            int unitsInStock = resultSet.getInt("units_in_stock");
            products.add(new Product(id, sku, name, description, category_id, unit_price, image_url, active, unitsInStock));
        }

        return products;
    }

    public Product addProduct(Product product) {

        try {

            Connection connection = DatabaseConnection.getConnection();
            String query = "INSERT INTO product(id,sku,name,description,category_id,unit_price,image_url,active,units_in_stock) VALUES(?,?,?,?,?,?,?,?,?)";
            PreparedStatement pst = connection.prepareStatement(query);
            Long id = product.getId();
            String sku = product.getSku();
            String name = product.getName();
            String description = product.getDescription();
            int category_id = product.getcategoryId();
            BigDecimal unit_price = product.getUnitPrice();
            String image_url = product.getImageUrl();
            Boolean active = product.isActive();
            int unitsInStock = product.getUnitsInStock();

            pst.setLong(1, id);
            pst.setString(2, sku);
            pst.setString(3, name);
            pst.setString(4, description);
            pst.setInt(5, category_id);
            pst.setBigDecimal(6, unit_price);
            pst.setString(7, image_url);
            pst.setBoolean(8, active);
            pst.setInt(9, unitsInStock);
            pst.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        // products.add(product);
        return product;

    }

    public Product updateProduct(Product product) {

        try {

           Connection connection = DatabaseConnection.getConnection();

            String query = "UPDATE product set  sku = ?, name = ?, description = ?, category_id = ?, unit_price = ?, " +
                    "image_url = ?, active = ?, units_in_stock = ?  WHERE id = ? ";

            PreparedStatement pst = null;

            pst = connection.prepareStatement(query);

            Long id = product.getId();
            String sku = product.getSku();
            String name = product.getName();
            String description = product.getDescription();
            int category_id = product.getcategoryId();
            BigDecimal unit_price = product.getUnitPrice();
            String imageUrl = product.getImageUrl();
            Boolean active = product.isActive();
            int unitsInStock = product.getUnitsInStock();

            pst.setString(1, sku);
            pst.setString(2, name);
            pst.setString(3, description);
            pst.setInt(4, category_id);
            pst.setBigDecimal(5, unit_price);
            pst.setString(6, imageUrl);
            pst.setBoolean(7, active);
            pst.setInt(8, unitsInStock);
            pst.setLong(9, id);
            pst.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return product;
    }

    public void deleteProduct(int id) throws SQLException, ClassNotFoundException {
        Connection connection = DatabaseConnection.getConnection();

        String query = "DELETE FROM product WHERE id = ? ";

        PreparedStatement pst = connection.prepareStatement(query);

        pst.setLong(1, id);
        pst.executeUpdate();
    }
}
