package kr.or.iei.challenge.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.challenge.model.vo.Challenge;

@Mapper
public interface ChallengeDao {
	
	//챌린지 목록
	List challengeList1();
	
	//챌린지 목록(종료)
	List challengeList2();		
	
	//챌린지 상세보기
	Challenge selectOneChallenge(int challengeNo);

	//챌린지 만들기
	int insertChallenge(Challenge c);
	
	//챌린지 삭제
	int deleteChallenge(int challengeNo);
	
	//챌린지 포기
	int changeChallenge(Challenge c);

}
