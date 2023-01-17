package Service;

import Repository.ProductRepository;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Part;
import model.Product;
import utils.JavaUtils;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

public class ProductService {

    private ProductRepository productRepository = new ProductRepository();
    public List<Product> getAllProducts() throws SQLException, ClassNotFoundException {
        return productRepository.getAllProducts();
    }

    public Product addProduct(HttpServletRequest request) throws IOException, ServletException {

        Product product =  new Gson().fromJson(request.getParameter("product"),Product.class);
        product.setImageUrl(JavaUtils.fileUpload(request));

        return productRepository.addProduct(product);
    }


    public Product updateProduct(HttpServletRequest request) throws IOException, ServletException {

        Product product =  new Gson().fromJson(request.getParameter("product"),Product.class);
        product.setImageUrl(JavaUtils.fileUpload(request));

        return productRepository.updateProduct(product);
    }

    public void deleteProduct(int id) throws SQLException, ClassNotFoundException {
          productRepository.deleteProduct(id);
    }
}
