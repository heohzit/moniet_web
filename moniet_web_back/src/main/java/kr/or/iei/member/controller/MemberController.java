package kr.or.iei.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.member.model.service.MemberService;
import kr.or.iei.member.model.vo.Member;

@RestController 
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	//id 중복체크
	@GetMapping(value="/checkId")
	//@PathVariable : 경로에 있는 변수 , memberId
	public int checkId(String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if(m == null) {
			return 0;
		}else {
			return 1;
		}
	}
	/*
	
	//회원가입
	//service 호출 시 메소드 이름이 Member로 끝나면서 매개변수가 Member 타입이면 비밀번호 암호화 수행
	@PostMapping(value="/join")
	public int join(@RequestBody Member member) {
		int result = memberService.insertMember(member);
		return result;
	}
	
	//login
	@PostMapping(value="/login")
	public String login(@RequestBody Member member) {
		String result = memberService.login(member);
		return result;
	}
	*/
}
