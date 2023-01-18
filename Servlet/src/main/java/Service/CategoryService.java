package Service;

import Repository.CategoryRepository;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import model.Category;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public class CategoryService {

    private CategoryRepository categoryRepository = new CategoryRepository() ;


    public List<Category> getAllCategories()  {

        return categoryRepository.getAllCategories();
    }

    public Category addCategory(HttpServletRequest request) throws  IOException {
        StringBuilder sb = new StringBuilder();
        String s;
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        Gson gson = new Gson();
        Category category = gson.fromJson(sb.toString(), Category.class);
         System.out.println(category);
        return categoryRepository.addCategory(category);
    }

    public Category updateCategory(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        String s;
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        Gson gson = new Gson();
        Category category = gson.fromJson(sb.toString(), Category.class);
        System.out.println(category);
        return categoryRepository.updateCategory(category);
    }

    public void deleteCategory(int id) throws IOException {

         categoryRepository.deleteCategory(id);
    }
}
