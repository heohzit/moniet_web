package kr.or.iei;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import kr.or.iei.member.model.vo.Member;

@Aspect
@Component
public class MonietPasswordEncAdvice {
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Pointcut(value="execution (int kr.or.iei.member.model.service.MemberService.*Member(kr.or.iei.member.model.vo.Member))")
	public void pwEncPointcut() {}
	
	@Before(value="pwEncPointcut()")
	public void pwEncAdvice(JoinPoint jp) {
		Member m = (Member)jp.getArgs()[0];
		String encPw = bCryptPasswordEncoder.encode(m.getMemberPw());
		m.setMemberPw(encPw);
	}
	
}
