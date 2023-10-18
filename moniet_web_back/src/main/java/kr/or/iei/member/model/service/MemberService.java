package kr.or.iei.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.JwtUtil;
import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.vo.Member;

@Service
public class MemberService {
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private JwtUtil jwtUtil;
	@Value("${jwt.secret}")
	private String secretKey;
	private long expiredMs;

	public MemberService() {
		super();
		expiredMs = 1000*60*60l;
	}

	
	
	@Transactional
	public int insertMember(Member m) {
		return memberDao.insertMember(m) ;
	}
	

	public String login(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		if(m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
			return jwtUtil.createToken(member.getMemberId(), secretKey, expiredMs);
		}else {
			return "실패";
		}
		
	}

	@Transactional
	public int deleteMember(String memberId) {
		return memberDao.deleteMember(memberId);
	}

	@Transactional // 회원정보수정
	public int updateMemberInfo(Member m) {
		System.out.println(m);
		return memberDao.updateMemberInfo(m);
	
	}

	public int pwCheck(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		if(m!=null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
			return 1;
	}
		return 0;
	}

	@Transactional
	public int updatePwMember(Member member) {
		// TODO Auto-generated method stub
		return memberDao.updatePwMember(member);
	}


	public Member selectOneMember(String memberId) {
		return memberDao.selectOneMember(memberId);
	}



	public Member selectOneMemberPw(String memberId, String memberName, String memberEmail) {
		//System.out.println(memberId);
		//System.out.println(memberName);
		//System.out.println(memberEmail);
		return memberDao.selectOneMemberPw(memberId,memberName,memberEmail);
		
	}



	public Member selectOneMemberId(String memberName, String memberEmail) {
		return memberDao.selectOneMemberId(memberName, memberEmail);
	}


	@Transactional
	//새 비밀번호 update
	public int updateNewPwMember(Member member) {
		return memberDao.updateNewPwMember(member);
	}


	//전체회원조회
	public List allMember() {
		return memberDao.allMember();
	}

	
	



	

	


	



	

	
}
