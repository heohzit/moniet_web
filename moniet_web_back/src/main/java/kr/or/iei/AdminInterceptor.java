package kr.or.iei;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

import kr.or.iei.member.model.vo.Member;

public class AdminInterceptor implements HandlerInterceptor{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		HttpSession session = request.getSession();
		Member m = (Member)session.getAttribute("m");
		if(m.getMemberGrade() == 0) {	//관리자면
			return true;
		} else {
			response.sendRedirect("/member/adminMsg");
			return false;
		}
	}
	
}
