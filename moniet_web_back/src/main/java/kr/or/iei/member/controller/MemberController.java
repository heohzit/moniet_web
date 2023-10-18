package kr.or.iei.member.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.EmailSender;
import kr.or.iei.FileUtil;
import kr.or.iei.member.model.service.MemberService;
import kr.or.iei.member.model.vo.Member;

@RestController 
@RequestMapping(value="/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private FileUtil fileUtil;
	
	@Autowired
	private EmailSender emailSender;
	
	@Value("${file.root}")
	private String root;
	
	
	
	
	//id 중복체크
	@GetMapping(value="/checkId")
	public int checkId(String memberId) {
		Member m = memberService.selectOneMember(memberId);
		if(m == null) {
			return 0;
		}else {
			return 1;
		}
	}
	
	//회원정보조회(비밀번호  찾기)
	@PostMapping(value="/memberCheck")
	public Member memberCheck(@RequestBody Member member) {
		Member m  = memberService.selectOneMemberPw(member.getMemberId(), member.getMemberName(), member.getMemberEmail());
		if(m != null) {
			return m;
		}
		else {
			return null;
		}
	}
	//회원정보조회(아이디 찾기)
	@PostMapping(value="/searchId")
    public Member searchId(@RequestBody Member member) {
		Member m = memberService.selectOneMemberId(member.getMemberName(),member.getMemberEmail());
		if(m != null) {
			return m;
		}else {
			return null;
		}
	}
    

	//회원가입
	//service 호출 시 메소드 이름이 Member로 끝나면서 매개변수가 Member 타입이면 비밀번호 암호화 수행
	//파일 타입을 받을땐  @ModelAttribute
	@PostMapping(value="/join")
	public int join(@ModelAttribute Member m, @ModelAttribute MultipartFile thumbnail) {
		String savepath = root+"member/";
		
		if(thumbnail != null) {
			
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			m.setImgFile(filepath);
		}
		System.out.println(m);		
		int result = memberService.insertMember(m);
		return result;
	}
	
	//login
	@PostMapping(value="/login")
	public String login(@RequestBody Member member) {
		String result = memberService.login(member);
		return result;
	}
	
	@PostMapping(value="/getMember")
	public Member mypage(@RequestAttribute String memberId) {
		return memberService.selectOneMember(memberId);	
	}
	
	//회원정보수정
	@PostMapping(value="/updateMember")
		
		public int update(@ModelAttribute Member m, @ModelAttribute MultipartFile thumbnail) {
		String savepath = root+"member/";
		if(thumbnail != null) {
			
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail);
			m.setImgFile(filepath);
		}
		System.out.println(m);
			return memberService.updateMemberInfo(m);
		}

	//회원탈퇴 
	@PostMapping(value="delete")
	public int delete(@RequestAttribute String memberId) {
		int result =  memberService.deleteMember(memberId);
		return result;
		
	}
	//비밀번호 확인
	@PostMapping(value="pwCheck")
	public int pwCheck(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.pwCheck(member);
	}
	//비밀번호 변경
	@PostMapping(value="/updatePw") 
	public int updatePw(@RequestBody Member member, @RequestAttribute String memberId) {
		member.setMemberId(memberId);
		return memberService.updatePwMember(member);
	}

	//email전송 : 임시비밀번호
	@PostMapping(value="/sendPw") 
		public int sendPw(@RequestBody Member member) {
			String pwCode = emailSender.sendPw(member.getMemberEmail());
			member.setMemberPw(pwCode);
			System.out.println(pwCode);
			System.out.println(member.getMemberPw());
			return memberService.updatePwMember(member);

		}
	
	//email전송 : 회원가입 인증번호 발송
	@PostMapping(value="/sendAuth") 
	public String sendAuth(@RequestBody Member member) {
		//System.out.println(member.getMemberEmail());
		String authCode = emailSender.sendAuth(member.getMemberEmail());
		return authCode;
	}
	
	//전체회원조회 
	@GetMapping(value="/allMember")
	public List allMember() {
		return memberService.allMember();
		
	}
	
	//관리자페이지 아이디검색
	@GetMapping(value="/searchMemberId/{memberId}")
	public List searchMemberId(@PathVariable String memberId) {
		System.out.println(memberId);
		List list = memberService.searchMemberId(memberId);
		if(! list.isEmpty()) {
			return list;
		}else {
			return null; 
			
		}
	}
	
}
