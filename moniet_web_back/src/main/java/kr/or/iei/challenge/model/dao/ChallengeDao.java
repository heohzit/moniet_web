package kr.or.iei.challenge.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.challenge.model.vo.Challenge;

@Mapper
public interface ChallengeDao {
	
	//챌린지 목록
	List challengeList1(String memberId);
	
	//챌린지 목록(종료)
	List challengeList2(String memberId);		
	
	//챌린지 상세보기
	Challenge selectOneChallenge(int challengeNo,String memberId);

	//챌린지 상세보기(저축)
	Challenge selectOneChallenge2(int challengeNo, String memberId);

	//챌린지 만들기
	int insertChallenge(Challenge c);
	
	//챌린지 삭제
	int deleteChallenge(int challengeNo);
	
	//챌린지 포기
	int changeChallenge(Challenge c);
	
	//챌린지 기간 종료
	void challengeFinish();

	//챌린지 레벨 조회
	int challengeLevel(String memberId);

	List challengeListsByMember(String memberId);
	
	//챌린지 성공/실패 결과
	int resultChallenge(String memberId);
	
	//챌린지 성공/실패 결과
	int resultChallenge2(String memberId);


}
