package com.example.springbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
    "/api/auth/register",
    "/api/auth/login",
    "/api/orders"
).permitAll()
                .anyRequest().authenticated()
            )
            .cors(cors -> cors
                .configurationSource(request -> {
                    org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
                    config.setAllowedOrigins(java.util.List.of(
                        "http://localhost:5173",
                        "http://localhost:3000",
                        "https://sciencehub-three.vercel.app"
                    ));
                    config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(java.util.List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                })
            );
        return http.build();
    }
}
