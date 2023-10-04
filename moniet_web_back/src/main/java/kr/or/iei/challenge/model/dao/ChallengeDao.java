package kr.or.iei.challenge.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.challenge.model.vo.Challenge;

@Mapper
public interface ChallengeDao {
	
	//챌린지 목록
	List challengeList();
	
	//챌린지 상세보기
	Challenge selectOneChallenge(int challengeNo);

}
