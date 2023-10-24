package kr.or.iei;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import kr.or.iei.member.model.vo.Member;

public class LoginInterceptor implements HandlerInterceptor{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		//세션 접근
		HttpSession session = request.getSession();
		Member m = (Member)session.getAttribute("m");//object타입이라 멤버로 형변환
		if(m==null) {
			response.sendRedirect("/member/loginMsg");
			return false;
		} else {		//로그인이 되어있으므로
			return true;//컨트롤러 실행
		}
	}
/*
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		System.out.println("여기는 인터셉터 - 컨트롤러 수행 후");
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		System.out.println("여기는 인터셉터 - 무조건 수행(잘끝나던/예외가 발생하건)");
	}
*/
}
