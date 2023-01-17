package utility;

import DTO.ErrorResponseDTO;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class HttpUtility {
    public static boolean isUrlAllowed(String url) {
        boolean allowed = false;
        for (String pattern : ConstantUtilty.ALLOWED_PATHS) {
            boolean check = url.matches(pattern);
            if (check) {
                allowed = true;
                break;
            }
        }
        return allowed;
    }

    public static void sendErrorResponse(HttpServletResponse response, int status, String message) {
        try {
            ErrorResponseDTO err = new ErrorResponseDTO(status, message);
            response.setStatus(status);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().print(new Gson().toJson(err));
        } catch (IOException exception) {
            exception.printStackTrace();
        }
    }

    public static void sendResponse(HttpServletResponse response, Object object) {
        try {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().print(new Gson().toJson(object));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
