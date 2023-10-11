package kr.or.iei;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class JwtConfig {
	@Value("${jwt.secret}")
	private String secretKey;
	@Autowired
	private JwtUtil jwtUtil;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
				.httpBasic().disable()				
				.csrf().disable().cors()
				.and()
				.authorizeRequests()				//요청에 대한 권한설정
				.antMatchers(HttpMethod.POST, "/member/login","/member/join","/member/memberCheck","/member/searchId").permitAll()
				// /member/로 시작하면 반드시 인증 하도록 설정
				.antMatchers(HttpMethod.POST,"/member/**").authenticated()
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.addFilterBefore(new JwtFilter(secretKey, jwtUtil)
						, UsernamePasswordAuthenticationFilter.class)
				.build();
	}

}
