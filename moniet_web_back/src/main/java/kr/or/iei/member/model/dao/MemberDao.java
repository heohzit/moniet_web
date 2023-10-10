package kr.or.iei.member.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.member.model.service.MemberService;
import kr.or.iei.member.model.vo.Member;


@Mapper
public interface MemberDao {

	Member selectOneMember(String memberId);
	
	int insertMember(Member member);

	int deleteMember(String memberId);

	int updateMemberInfo(Member member);

	int updatePwMember(Member member);

	

}
