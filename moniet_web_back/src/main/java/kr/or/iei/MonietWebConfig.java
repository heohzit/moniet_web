package kr.or.iei;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MonietWebConfig implements WebMvcConfigurer{
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/community/**")
		.addResourceLocations("file:///C:/Temp/moneiet/community/");
		
		registry.addResourceHandler("/community/editor/**")
		.addResourceLocations("file:///C:/Temp/moneiet/community/editor/");
		
		registry.addResourceHandler("/member/**")
		.addResourceLocations("file:///C:/Temp/moneiet/member/");
		
		registry.addResourceHandler("/member/**")
		.addResourceLocations("file:///C:/Temp/moneiet/member/editor/");
		
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
