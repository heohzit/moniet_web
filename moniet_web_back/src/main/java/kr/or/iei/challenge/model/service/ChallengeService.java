package kr.or.iei.challenge.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.cashbook.model.dao.CashbookDao;
import kr.or.iei.challenge.model.dao.ChallengeDao;
import kr.or.iei.challenge.model.vo.Challenge;
import kr.or.iei.member.model.dao.MemberDao;

@Service
public class ChallengeService {
	@Autowired
	private ChallengeDao challengeDao;
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private CashbookDao cashbookDao; 
	
	//챌린지 목록
	public Map challengeList1(String memberId) {
		List challengeList = challengeDao.challengeList1(memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("challengeList", challengeList);
		return map;
	}
	
	//챌린지 목록(종료)
	public Map challengeList2(String memberId) {
		List challengeList = challengeDao.challengeList2(memberId);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("challengeList", challengeList);
		return map;
	}
	
	//챌린지 상세보기
	public Challenge selectOneChallenge(int challengeNo,String memberId) {
		Challenge c = challengeDao.selectOneChallenge(challengeNo,memberId);
		return c;
	}
	
	//챌린지 상세보기(저축)
	public Challenge selectOneChallenge2(int challengeNo,String memberId) {
		Challenge c = challengeDao.selectOneChallenge2(challengeNo,memberId);
		return c;
	}
	
	//챌린지 만들기
	@Transactional
	public int insertChallenge(Challenge c) {
		int result = challengeDao.insertChallenge(c);
		return result;
	}
	
	//챌린지 삭제
	@Transactional
	public int deleteChallenge(int challengeNo) {
		int result = challengeDao.deleteChallenge(challengeNo);
		return result;
	}
	
	//챌린지 포기
	@Transactional
	public int changeChallenge(Challenge c,String memberId) {
		int result = challengeDao.changeChallenge(c);
		if(result==1) {
			memberDao.downLevel(memberId);
		}
		return result;
	}
	
	//챌린지 기간 종료
	public void challengeFinish() {
		// TODO Auto-generated method stub
		challengeDao.challengeFinish();
	}
	
	//챌린지 레벨 조회
	public int challengeLevel(String memberId) {
		int challenge = challengeDao.challengeLevel(memberId);
		return challenge;
	}

	//입력창 챌린지 목록 띄우는 용도
	public List challengeListsByMember(String memberId) {
		return challengeDao.challengeListsByMember(memberId);
	}

	//챌린지 금액 상세 조회(지출)
	public Map viewData(String memberId, int challengeNo) {
		List viewData = cashbookDao.viewData(memberId,challengeNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("viewData", viewData);
		return map;
	}
	
	//챌린지 금액 상세 조회(저축)
	public Map viewData2(String memberId, int challengeNo) {
		List viewData = cashbookDao.viewData2(memberId,challengeNo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("viewData", viewData);
		return map;
	}
	
}
