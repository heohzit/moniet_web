package kr.or.iei.member.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.member.model.service.MemberService;
import kr.or.iei.member.model.vo.Member;


@Mapper
public interface MemberDao {

	Member selectOneMember(String memberId);

	int insertMember(Member m);

	int deleteMember(String memberId);

	int updateMemberInfo(Member m);

	int updatePwMember(Member member);

	Member selectOneMemberPw(String memberId, String memberName, String memberEmail);

	Member selectOneMemberId(String memberName, String memberEmail);

	int updateNewPwMember(Member member);
	
	
	
	//챌린지 성공했을때 레벨업
	void upgradeLevel(String memberId);
	
	//챌린지 성공했을때 레벨다운
	void downLevel(String memberId);

	//전체 회원 조회
	List allMember();
	
	//관리자페이지 - 아이디검색
	List searchMemberId(String memberId);

	
	
	
	
	

	


	

	

	

	

}
