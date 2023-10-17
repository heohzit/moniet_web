package kr.or.iei.cashbook.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.cashbook.model.dao.CashbookDao;
import kr.or.iei.cashbook.model.vo.Cashbook;
import kr.or.iei.cashbook.model.vo.Category;
import kr.or.iei.challenge.model.dao.ChallengeDao;
import kr.or.iei.member.model.dao.MemberDao;

@Service
public class CashbookService {

	@Autowired
	private CashbookDao cashbookDao;
	@Autowired
	private ChallengeDao challengeDao;
	@Autowired
	private MemberDao memberDao;

	public List cashbookList(Cashbook cashbook) {
		return cashbookDao.cashbookList(cashbook);
	}
	
	public List cashbookListSpending(Cashbook cashbook) {
		return cashbookDao.cashbookListSpending(cashbook);
	}
	
	public List cashbookListIncome(Cashbook cashbook) {
		return cashbookDao.cashbookListIncome(cashbook);
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
		int challengeNo = cashbook.getChallengeNo();
		String memberId = cashbook.getMemberId();
		if(result==1) {
			int cashbookCate=cashbook.getCashbookCategory();
			if(cashbookCate==21) {
				int result1=challengeDao.resultChallenge(challengeNo);
				if(result1!=0) {
					System.out.println(result1+"이건뭔대");
					memberDao.upgradeLevel(memberId);
				}
			}else {
				int result2 =challengeDao.resultChallenge2(memberId);
				System.out.println(result2+"여기까지 오나");
				if(result2!=0) {
					memberDao.downLevel(memberId);
				}
			}
		}
		return result;
	}
	
	//파이 대시보드
	public List pieDash(String memberId, int month) {
		List sum = cashbookDao.pieDash(memberId,month);
		return sum;
	}
	
	//바 대시보드
	public List barDash(String memberId, int month) {
		List list = cashbookDao.barDash(memberId,month);
		return list;
	}
	
	//라인 대시보드
	public List lineDash(String memberId) {
		List list = cashbookDao.lineDash(memberId);
		return list;
	}

	@Transactional
	public boolean deleteCashbook(String cashbookNoArr, String memberId) {
		
		StringTokenizer sT1 = new StringTokenizer(cashbookNoArr, "-");
		boolean result = true;
		while (sT1.hasMoreTokens()) {
			int cashbookNo = Integer.parseInt(sT1.nextToken());
			System.out.println(cashbookNo);
			int delResult = cashbookDao.deleteCashbook(cashbookNo, memberId);
			if (delResult == 0) { // 실패
				result = false;
				break;
			}
		}
		return result;
	}

	@Transactional
	public int updateCashbook(Cashbook cashbook) {
		return cashbookDao.updateCashbook(cashbook);
	}
}