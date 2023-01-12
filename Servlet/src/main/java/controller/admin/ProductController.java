package controller.admin;

import Service.ProductService;
import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Product;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

@WebServlet("/admin/product/*")
public class ProductController extends HttpServlet {

    private ProductService productService = new ProductService();


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Product products = null;
        try {
            try {
                products = productService.addProduct(request);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                PrintWriter writer = response.getWriter();
                Gson gson = new Gson();
                writer.print(gson.toJson(products));
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();

        Product products = null;

        PrintWriter writer = response.getWriter();

        try {
            products = productService.updateProduct(request);
            writer.print(gson.toJson(products));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {

        PrintWriter writer = response.getWriter();

        int index = Integer.parseInt(request.getPathInfo().split("/")[1]);

        try {
            productService.deleteProduct(index);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
//        writer.print(index + " deleted");
    }

}
