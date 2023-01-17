package utils;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Part;

import java.io.File;
import java.io.IOException;

public class JavaUtils {
    public static String getFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        System.out.println("content-disposition header= "+contentDisp);
        String[] tokens = contentDisp.split(";");
        for (String token : tokens) {
            if (token.trim().startsWith("filename")) {
                return token.substring(token.indexOf("=") + 2, token.length()-1);
            }
        }
        return "";

    }

    public static String fileUpload(HttpServletRequest request) throws ServletException, IOException {
        final Part filePart = request.getPart("file");

        String UPLOAD_DIR = "uploads";

        // gets absolute path of the web application
        String applicationPath = request.getServletContext().getRealPath("");
        // constructs path of the directory to save uploaded file
        String uploadFilePath = applicationPath  + UPLOAD_DIR;

        //String path = "D:/ServletProject/servletFront/src/assets/images/products";
        File fileSaveDir = new File(uploadFilePath);
        if (!fileSaveDir.exists()) {
            fileSaveDir.mkdirs();
        }
        System.out.println("Upload File Directory="+fileSaveDir.getAbsolutePath());

        String fileName = JavaUtils.getFileName(filePart);
        filePart.write(uploadFilePath + File.separator + fileName);

        return fileName;
    }
}
