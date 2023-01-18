package controller.admin;

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

@WebServlet("/admin/category/*")
public class CategoryController extends HttpServlet {
    private CategoryService categoryService = new CategoryService();


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();

       Category category = null;
        PrintWriter writer = response.getWriter();

            category = categoryService.addCategory(request);
            writer.print(gson.toJson(category));

    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();

       Category category = null;

        PrintWriter writer = response.getWriter();


            category = categoryService.updateCategory(request);
            writer.print(gson.toJson(category));

    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {

        PrintWriter writer = response.getWriter();

        int index = Integer.parseInt(request.getPathInfo().split("/")[1]);

              categoryService.deleteCategory(index);
            System.out.println("deleted");

    }

}
