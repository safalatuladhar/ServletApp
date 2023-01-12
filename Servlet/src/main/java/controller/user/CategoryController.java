package controller.user;

import Service.CategoryService;
import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Category;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/user/category/*")
public class CategoryController extends HttpServlet {
    private CategoryService categoryService = new CategoryService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();

        List<Category> categories = null;

        PrintWriter writer = response.getWriter();
        writer.flush();
        try {
            categories = categoryService.getAllCategories();
            writer.print(gson.toJson(categories));
            System.out.println(writer);
            writer.flush();
            writer.close();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

}
