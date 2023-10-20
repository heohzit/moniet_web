package kr.or.iei.cashbook.model.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
		int result=0;
		int cashbookLoop = cashbook.getCashbookLoop();
		int loopMonth = cashbook.getLoopMonth();
		int money = cashbook.getCashbookMoney();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		Calendar checkCal = Calendar.getInstance();
		try {
			Date date = sdf.parse(cashbook.getCashbookDate());	//str>date
			cal.setTime(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(cashbookLoop == 0) {
			result = cashbookDao.insertCashbook(cashbook);
		} else if(cashbookLoop == 2) {	//할부 일때 
			for(int i =0 ; i<cashbook.getLoopMonth() ; i++ ) {
				cashbook.setLoopRound(i+1);
				cashbook.setCashbookMoney(money/loopMonth);
				//if(cal.getActualMaximum(Calendar.DAY_OF_MONTH) == date.get)
				
				
				
				if(i==0) {
					cal.add(Calendar.MONTH, 0);					
				} else {
					cal.add(Calendar.MONTH, 1);
				}
				String cashDate = sdf.format(cal.getTime()); 
				cashbook.setCashbookDate(cashDate);
				System.out.println(i+"날짜 바뀌는 현황 : " + cashDate);
				result+=cashbookDao.insertCashbook(cashbook);
				if(result == cashbook.getLoopMonth()) {
					result = -1;//성공여부 확인용
				}
			}
		} else if(cashbookLoop == 1) {	//반복일 때
			try {
				Date date = sdf.parse(cashbook.getCashbookDate());
				String checkDateStr = "2024-12-31";
				Date checkDate = sdf.parse(checkDateStr);
				System.out.println("checkDate: "+checkDate);
				cal.setTime(date);
				//최초로 들어온 날짜에 한번삽입
				cal.add(Calendar.MONTH, 0);
				String cashDate = sdf.format(cal.getTime()); 
				cashbook.setCashbookDate(cashDate);
				result=cashbookDao.insertCashbook(cashbook);
				System.out.println("cashDate : "+cashDate);
				//반복개월만큼 삽입
				
				while(date.before(checkDate)) {
					cal.add(Calendar.MONTH, loopMonth);
					cashDate = sdf.format(cal.getTime());
					System.out.println("cashDate : "+cashDate);
					cashbook.setCashbookDate(cashDate);
					result+=cashbookDao.insertCashbook(cashbook);
					date=cal.getTime();
					if(date.after(checkDate)) {
						break;
					}
				}
				//성공여부 확인 위한 개월수 구하기
				int year = Integer.parseInt(cashbook.getCashbookDate().substring(0, 4));
				int month = Integer.parseInt(cashbook.getCashbookDate().substring(5, 7));
				int checkYear = Integer.parseInt(checkDateStr.substring(0, 4));
				int checkMonth = Integer.parseInt(checkDateStr.substring(5, 7));
				int month_diff = (year-checkYear)*12+(month-checkMonth);
				
				int resultChk = Math.abs(month_diff/cashbook.getLoopMonth());
				System.out.println("resultChk : "+resultChk);
				if(result == resultChk) {
					result = -1;//성공여부 확인용
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
		}
		int challengeNo = cashbook.getChallengeNo();
		String memberId = cashbook.getMemberId();
		if(result==1) {
			int cashbookCate=cashbook.getCashbookCategory();
			if(cashbookCate==21) {
				int result1=challengeDao.resultChallenge(challengeNo);
				if(result1!=0) {
					memberDao.upgradeLevel(memberId);
				}
			}else {
				int result2 =challengeDao.resultChallenge2(memberId);
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

	public List calList(Cashbook cashbook) {
		return cashbookDao.calList(cashbook);
	}

	public int todayIncome(String memberId) {
		// TODO Auto-generated method stub
		return cashbookDao.todayIncome(memberId);
	}

	public int todaySpending(String memberId) {
		// TODO Auto-generated method stub
		return cashbookDao.todaySpending(memberId);
	}
}