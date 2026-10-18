package com.example.fooddelivery.security;

import com.example.fooddelivery.service.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.fooddelivery.service.UserVerificationService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class UserVerificationSecurity 
{
	@Autowired
	UserVerificationService user_verification;

	@Autowired
	JwtFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http)throws Exception
	{
		http.csrf(csrf-> csrf.disable());
		http.sessionManagement(session ->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.cors(Customizer.withDefaults());

		http.authorizeHttpRequests(authorized_request-> authorized_request.requestMatchers("/authenticate/**","/user-check","/refresh","/error").permitAll());
		http.authorizeHttpRequests(authorized_request-> authorized_request.requestMatchers("/admin/**").hasRole("ADMIN"));
		http.authorizeHttpRequests(authorized_request-> authorized_request.requestMatchers("/customer/**").hasRole("CUSTOMER"));
		http.authorizeHttpRequests(authorized_request-> authorized_request.requestMatchers("/delivery_partner/**").hasRole("DELIVERY_PARTNER"));
		http.authorizeHttpRequests(authorized_request-> authorized_request.anyRequest().authenticated());
		http.formLogin(form -> form.disable());

		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource()
	{
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:5173"));
		configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**",configuration);
		return source;
	}
	
	@Bean
	public PasswordEncoder encoder()
	{
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception
	{
		return configuration.getAuthenticationManager();
	}
	
	@Bean
	public AuthenticationProvider authenticationProvider()
	{
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider(user_verification);
		
		provider.setPasswordEncoder(encoder());
		
		return provider;	
	}
}
