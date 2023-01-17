package controller.admin;

import Service.ProductService;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import model.Product;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;


import java.io.*;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

@WebServlet("/admin/product/*")
@MultipartConfig(fileSizeThreshold=1024*1024*10,
        maxFileSize=1024*1024*50,
        maxRequestSize=1024*1024*100)

public class ProductController extends HttpServlet {

    private ProductService productService = new ProductService();


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

                Product products = productService.addProduct(request);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                PrintWriter writer = response.getWriter();
                Gson gson = new Gson();
                writer.print(gson.toJson(products));
    }


    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

       Product  products = productService.updateProduct(request);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter writer = response.getWriter();
        Gson gson = new Gson();
        writer.print(gson.toJson(products));
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
