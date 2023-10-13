package kr.or.iei.cashbook.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.cashbook.model.dao.CashbookDao;
import kr.or.iei.cashbook.model.vo.Cashbook;
import kr.or.iei.cashbook.model.vo.Category;
import kr.or.iei.challenge.model.dao.ChallengeDao;

@Service
public class CashbookService {

	@Autowired
	private CashbookDao cashbookDao;
	@Autowired
	private ChallengeDao challengeDao;

	public List cashbookList(Cashbook cashbook) {
		return cashbookDao.cashbookList(cashbook);
	}

	public Map sumOfCashbook(Cashbook cashbook) {
		
		int sumOfIncome =cashbookDao.sumOfIncome(cashbook); 
		int sumOfSpending = cashbookDao.sumOfSpending(cashbook);
		int total = sumOfIncome - sumOfSpending;
		
		int totalCount = cashbookDao.totalCount(cashbook);
		int countOfIncome = cashbookDao.countOfIncome(cashbook);
		int countOfSpending = cashbookDao.countOfSpending(cashbook);
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("total", total);
		map.put("income", sumOfIncome);
		map.put("spending", sumOfSpending);
		map.put("totalCount", totalCount);
		map.put("countIn", countOfIncome);
		map.put("countOut", countOfSpending);
		return map;
	}
	

	public List categoryList(String memberId) {
		List list = cashbookDao.category(memberId);
		return list;
	}

	@Transactional
	public int insertCashbook(Cashbook cashbook) {
		int result=cashbookDao.insertCashbook(cashbook);
		if(result==1) {
			String memberId = cashbook.getMemberId();
			challengeDao.resultChallenge(memberId);
		}
		return result;
	}
	
	//파이 대시보드
	public List pieDash(String memberId) {
		List sum = cashbookDao.pieDash(memberId);
		return sum;
	}
	
	//바 대시보드
	public List barDash(String memberId) {
		List list = cashbookDao.barDash(memberId);
		return list;
	}
	
	//라인 대시보드
	public List lineDash(String memberId) {
		List list = cashbookDao.lineDash(memberId);
		return list;
	}
}
