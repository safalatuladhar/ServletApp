package filter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import utility.HttpUtility;
import utility.JwtUtilty;

import java.io.IOException;

@WebFilter(filterName = "JWTFilter", urlPatterns = "/*")

public class JWTFilter implements Filter {
    JwtUtilty jwtUtilty = new JwtUtilty();
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

        if (allowed) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            HttpUtility.sendErrorResponse(response, 403, "Resource access denied");
            return;
        }

        final String jwtToken = authHeader.substring(7);

        try {
            if (!jwtUtilty.isTokenValid(jwtToken)) {
                HttpUtility.sendErrorResponse(response, 403, "Resource access denied");
                return;
            }
        } catch (ExpiredJwtException e) {
            HttpUtility.sendErrorResponse(response, 403, "Token expired. Login Again!");
            return;
        }
        servletRequest.setAttribute("token", jwtToken);
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
