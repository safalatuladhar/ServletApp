package filter;


import Service.UserService;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import utility.HttpUtility;
import utility.JwtUtilty;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebFilter(filterName = "RoleFilter", urlPatterns = "/*")


public class RoleFilter implements Filter {

    private final JwtUtilty jwtUtilty;
    private final UserService userService;
    private final Map<String, String[]> roleMap;

    public RoleFilter(){
        this.jwtUtilty = new JwtUtilty();
        this.userService = new UserService();
        this.roleMap = new HashMap<>();

        roleMap.put("^/admin/.*$", new String[]{"Admin"});
        roleMap.put("^/user/.*$", new String[]{"User", "Admin"});
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String path = request.getRequestURI();
        boolean allowed = HttpUtility.isUrlAllowed(path);
        if (allowed){
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        final String jwtToken = (String) servletRequest.getAttribute("token");
        String username = jwtUtilty.getUsernameFromToken(jwtToken);
        List<String> roles = userService.getRolesByUsername(username);

        if (roles.size() == 0){
            HttpUtility.sendErrorResponse(response, 418, "No privileges");
            return;
        }

        for (Map.Entry<String, String[]> entry: roleMap.entrySet()){
            String pattern = entry.getKey();
            if (path.matches(pattern)){
                String[] apiRoles = entry.getValue();
                for (String apiRole : apiRoles){
                    if (roles.contains(apiRole)){
                        filterChain.doFilter(servletRequest,servletResponse);
                        return;
                    }
                }
                HttpUtility.sendErrorResponse(response, 403, "Insufficient privileges");
                return;
            }
        }
        HttpUtility.sendErrorResponse(response, 403, "Insufficient privileges");
        return;

    }


    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}





