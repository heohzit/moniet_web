package kr.or.iei.member.model.service;

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

	/*
	public MemberService() {
		super();
		expiredMs = 1000*60*60l;
	}
	*/

	public Member selectOneMember(String memberId) {
		System.out.println(memberId);
		return memberDao.selectOneMember(memberId);
	}
	
	/*
	@Transactional
	public int insertMember(Member member) {
		return memberDao.insertMember(member) ;
	}

	public String login(Member member) {
		Member m = memberDao.selectOneMember(member.getMemberId());
		if(m != null && bCryptPasswordEncoder.matches(member.getMemberPw(), m.getMemberPw())) {
			return jwtUtil.createToken(member.getMemberId(), secretKey, expiredMs);
		}else {
			return "실패";
		}
		
	}
	 */

	
}
