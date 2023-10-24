package kr.or.iei;

import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class WebServerCustom implements WebServerFactoryCustomizer<ConfigurableWebServerFactory>{
	//에러처리 커스텀화

	@Override
	public void customize(ConfigurableWebServerFactory factory) {
		//에러구분 1. 404 error
		ErrorPage error404 = new ErrorPage(HttpStatus.NOT_FOUND,"/error/notFound");
		
		//에러구분2. 500
		ErrorPage error500 = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR,"/error/serverError");
		
		factory.addErrorPages(error404, error500);//설정은 여기까지 → 이후 컨트롤러와 페이지 만들면 됨
	}

	
}
