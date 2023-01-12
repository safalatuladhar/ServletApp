package Service;

import Repository.ProductRepository;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import model.Product;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

public class ProductService {

    private ProductRepository productRepository = new ProductRepository();
    public List<Product> getAllProducts() throws SQLException, ClassNotFoundException {
        return productRepository.getAllProducts();
    }

    public Product addProduct(HttpServletRequest request) throws SQLException, ClassNotFoundException, ParseException, IOException {
        StringBuilder sb = new StringBuilder();
        String s;
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        Gson gson = new Gson();
        Product product = gson.fromJson(sb.toString(), Product.class);
       // System.out.println(product);
        return productRepository.addProduct(product);
    }

    public Product updateProduct(HttpServletRequest request) throws IOException, SQLException, ClassNotFoundException {
        StringBuilder sb = new StringBuilder();
        String s;
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        Gson gson = new Gson();
        Product product = gson.fromJson(sb.toString(), Product.class);
        System.out.println(product);
        return productRepository.updateProduct(product);
    }

    public void deleteProduct(int id) throws SQLException, ClassNotFoundException {
          productRepository.deleteProduct(id);
    }
}
