package kr.or.iei.challenge.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.challenge.model.dao.ChallengeDao;
import kr.or.iei.challenge.model.vo.Challenge;

@Service
public class ChallengeService {
	@Autowired
	private ChallengeDao challengeDao;
	
	//챌린지 목록
	public Map challengeList1() {
		List challengeList = challengeDao.challengeList1();
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("challengeList", challengeList);
		return map;
	}
	
	//챌린지 목록
	public Map challengeList2() {
		List challengeList = challengeDao.challengeList2();
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("challengeList", challengeList);
		return map;
	}
	
	//챌린지 상세보기
	public Challenge selectOneChallenge(int challengeNo) {
		Challenge c = challengeDao.selectOneChallenge(challengeNo);
		return c;
	}
	
	//챌린지 만들기
	public int insertChallenge(Challenge c) {
		int result = challengeDao.insertChallenge(c);
		return result;
	}
}
