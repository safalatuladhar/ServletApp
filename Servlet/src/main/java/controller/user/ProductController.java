package controller.user;

import Service.ProductService;
import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Category;
import model.Product;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

@WebServlet("/user/product/*")
public class ProductController extends HttpServlet {

    private ProductService productService = new ProductService();


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();

        List<Product> products = null;

        PrintWriter writer = response.getWriter();
        writer.flush();
        try {
            products = productService.getAllProducts();
            writer.print(gson.toJson(products));
            System.out.println(writer);
            writer.flush();
            writer.close();

        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

}
