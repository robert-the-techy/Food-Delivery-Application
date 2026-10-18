package com.example.fooddelivery.service;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter
{
    @Autowired
    JwtService jwtService;

    @Autowired
    UserVerificationService userVerificationService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @Nonnull HttpServletResponse response, @Nonnull FilterChain filterChain) throws ServletException, IOException
    {
        String requestHeader = request.getHeader("Authorization");
        if(requestHeader == null || !requestHeader.startsWith("Bearer "))
        {
            filterChain.doFilter(request,response);
            return;
        }
        String jwtToken = requestHeader.substring(7);
        String code = jwtService.extractCode(jwtToken);
        UserDetails userDetails = userVerificationService.loadUserByUsername(code);
        if(jwtService.isTokenValid(jwtToken,userDetails))
        {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request,response);
    }
}
