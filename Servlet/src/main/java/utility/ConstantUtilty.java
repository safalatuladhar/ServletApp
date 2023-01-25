package utility;

import java.util.Map;
import java.util.Set;

public class ConstantUtilty {
    public static final Set<String> ALLOWED_PATHS = Set.of("/login", "/user/product/.*$","/user/category/.*$",  "/uploads/.*$");
//    public static final Map<String, String> env = System.getenv();
   // public static final Set<String> ALLOWED_ORIGINS = Set.of("http://localhost:4200");
}
