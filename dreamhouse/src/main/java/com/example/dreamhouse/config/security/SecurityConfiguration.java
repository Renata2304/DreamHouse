package com.example.dreamhouse.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    @Value("${vars.security.enable}")
    private boolean securityEnabled;

    private JwtAuthEntryPoint authEntryPoint;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain authServerSecurityFilterChain (HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable);
        if (securityEnabled) {
//           http.authorizeHttpRequests(auth -> auth
//                   .requestMatchers("/api/v1/auth/login", "/api/v1/auth/register",
//                           "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
//                   .anyRequest().authenticated())
            http.authorizeHttpRequests(auth -> auth
                    // Public endpoints
                    .requestMatchers(
                            "/api/v1/auth/login",
                            "/api/v1/auth/register",
                            "/v3/api-docs/**",            // Swagger Docs
                            "/swagger-ui/**",             // Swagger UI
                            "/swagger-ui.html"
                    ).permitAll()

                    // Authenticated endpoints
                    .requestMatchers(
                            "/users/*",                   // matches /users/{id}
                            "/users/email/*",             // matches /users/email/{email}
                            "/users/all",
                            "/reviews/add",
                            "/reviews/byuser/*",          // matches /reviews/byuser/{userId}
                            "/reviews/bylisting/*",       // matches /reviews/bylisting/{listingId}
                            "/listing/addListing",
                            "/listing/getByLocation",
                            "/images/add",
                            "/images/bylisting/*",        // matches /images/bylisting/{listingId}
                            "/favorites/add",
                            "/favorites/exists"
                    ).authenticated()

                    // Admin-only access for DELETE on /users
                    .requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN")

                    // Any other request must be authenticated
                    .anyRequest().authenticated())
                   .exceptionHandling((exception)-> exception.authenticationEntryPoint(authEntryPoint))
                   .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
           http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        } else {
            http.authorizeHttpRequests(auth -> auth
                    .anyRequest().permitAll());
        }
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return  authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(){
        return new JwtAuthenticationFilter();
    }
}
