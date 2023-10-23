package kr.or.iei.cashbook.model.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import kr.or.iei.cashbook.model.vo.ChartData;
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
			int loopRef = 0;
			for(int i =0 ; i<cashbook.getLoopMonth() ; i++ ) {
				cashbook.setLoopRound(i+1);
				cashbook.setCashbookMoney(money/loopMonth);
				//if(cal.getActualMaximum(Calendar.DAY_OF_MONTH) == date.get)
				
				
				
				if(i==0) {
					cal.add(Calendar.MONTH, 0);
				} else {
					cal.add(Calendar.MONTH, 1);
					cashbook.setLoopRef(loopRef);
				}
				String cashDate = sdf.format(cal.getTime()); 
				cashbook.setCashbookDate(cashDate);
				result+=cashbookDao.insertCashbook(cashbook);
				if(i == 0) {
					loopRef = cashbook.getLoopRef();
				}
				if(result == cashbook.getLoopMonth()) {
					result = -1;//성공여부 확인용
				}
			}
		} else if(cashbookLoop == 1) {	//반복일 때
			try {
				Date date = sdf.parse(cashbook.getCashbookDate());
				String checkDateStr = "2024-12-31";
				Date checkDate = sdf.parse(checkDateStr);
				cal.setTime(date);
				//최초로 들어온 날짜에 한번삽입
				cal.add(Calendar.MONTH, 0);
				String cashDate = sdf.format(cal.getTime()); 
				cashbook.setCashbookDate(cashDate);
				result=cashbookDao.insertCashbook(cashbook);
				//반복개월만큼 삽입
				
				while(date.before(checkDate)) {
					cal.add(Calendar.MONTH, loopMonth);
					cashDate = sdf.format(cal.getTime());
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
	
	//파이 차트
	public List pieDash(String memberId, int month) {
		List sum = cashbookDao.pieDash(memberId,month);
		return sum;
	}
	
	//바 차트
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
			Cashbook cashbook = cashbookDao.selectOneCashbook(cashbookNo);
			if(cashbook.getCashbookLoop()==0) {
				int delResult = cashbookDao.deleteCashbook(cashbookNo, memberId);
				if (delResult == 0) { // 실패
					result = false;
					break;
				}
			} else if(cashbook.getCashbookLoop()==2) {//할부일 때 삭제
				ArrayList<Cashbook> updateList = cashbookDao.cashbookListByLoopRef(cashbook.getLoopRef());
				int updateResult =0;
				int delResult =0;
				for(Cashbook c : updateList) {
					c.setLoopMonth(cashbook.getLoopRound()-1);
					updateResult = cashbookDao.updateCashbook(c);
					if(c.getLoopRound()>=cashbook.getLoopRound()) {
						delResult = cashbookDao.deleteCashbook(c.getCashbookNo(), memberId);
					}
				}
				if(delResult ==0 || updateResult+delResult != updateList.size()) {//실패
					result = false;
					break;
				}
			}
		}
		return result;
	}

	@Transactional
	public int updateCashbook(Cashbook cashbook) throws ParseException {
		int result = 0;
		if(cashbook.getCashbookLoop()==0) {
			result = cashbookDao.updateCashbook(cashbook);
		} else if(cashbook.getCashbookLoop()==2) {//할부일 때 수정하기
			int loopRef = cashbookDao.selectLoopRef(cashbook.getCashbookNo());
			ArrayList<Cashbook> updateList = cashbookDao.cashbookListByLoopRef(loopRef);
			Cashbook standard = updateList.get(0);
			if(cashbook.getLoopMonth()==updateList.size()) {
				for(Cashbook c : updateList) {
					c.setCashbookFinance(cashbook.getCashbookFinance());
					c.setCashbookLoop(cashbook.getCashbookLoop());
					c.setCashbookAsset(cashbook.getCashbookAsset());
					c.setCashbookCategory(cashbook.getCashbookCategory());
					c.setCashbookMoney(cashbook.getCashbookMoney());
					c.setCashbookContent(cashbook.getCashbookContent());
					c.setCashbookMemo(cashbook.getCashbookMemo());
					c.setChallengeNo(cashbook.getChallengeNo());
					c.setMemberId(cashbook.getMemberId());
					c.setLoopMonth(cashbook.getLoopMonth());
					result+=cashbookDao.updateCashbook(c);
				}
			} else if(cashbook.getLoopMonth() < updateList.size()) {
				int updateResult = 0;
				int delResult = 0;
				for(Cashbook c : updateList) {
					if(c.getLoopRound()<=cashbook.getLoopMonth()) {
						c.setMemberId(cashbook.getMemberId());
						c.setCashbookFinance(cashbook.getCashbookFinance());
						c.setCashbookLoop(cashbook.getCashbookLoop());
						c.setLoopMonth(cashbook.getLoopMonth());
						c.setCashbookAsset(cashbook.getCashbookAsset());
						c.setCashbookCategory(cashbook.getCashbookCategory());
						c.setCashbookMoney(cashbook.getCashbookMoney());
						c.setCashbookContent(cashbook.getCashbookContent());
						c.setCashbookMemo(cashbook.getCashbookMemo());
						c.setChallengeNo(cashbook.getChallengeNo());
						c.setLoopMonth(cashbook.getLoopMonth());
						updateResult+=cashbookDao.updateCashbook(c);
					} else {
						delResult += cashbookDao.deleteCashbook(c.getCashbookNo(), cashbook.getMemberId());
					}
				}	
				result = updateResult - delResult;
			} else if(cashbook.getLoopMonth() > updateList.size()) {
				int updateResult = 0;
				int insertResult = 0;
				int loopMonth = cashbook.getLoopMonth();
				for(Cashbook c : updateList) {
					c.setMemberId(cashbook.getMemberId());
					c.setCashbookFinance(cashbook.getCashbookFinance());
					c.setCashbookLoop(cashbook.getCashbookLoop());
					c.setLoopMonth(cashbook.getLoopMonth());
					c.setCashbookAsset(cashbook.getCashbookAsset());
					c.setCashbookCategory(cashbook.getCashbookCategory());
					c.setCashbookMoney(cashbook.getCashbookMoney());
					c.setCashbookContent(cashbook.getCashbookContent());
					c.setCashbookMemo(cashbook.getCashbookMemo());
					c.setChallengeNo(cashbook.getChallengeNo());
					updateResult+=cashbookDao.updateCashbook(c);
				}
				int loopRound = updateList.size()+1;
				while(updateResult+insertResult<loopMonth) {
					Cashbook addCashbook = new Cashbook();
					addCashbook.setLoopRef(loopRef);
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					Calendar cal = Calendar.getInstance();
					Date date = sdf.parse(standard.getCashbookDate());	//str>date
					cal.setTime(date);
					cal.add(Calendar.MONTH, loopRound-1);
					addCashbook.setCashbookDate(sdf.format(cal.getTime()));
					addCashbook.setLoopRound(loopRound);
					addCashbook.setLoopRef(standard.getLoopRef());
					addCashbook.setMemberId(cashbook.getMemberId());
					addCashbook.setCashbookFinance(cashbook.getCashbookFinance());
					addCashbook.setCashbookLoop(cashbook.getCashbookLoop());
					addCashbook.setLoopMonth(cashbook.getLoopMonth());
					addCashbook.setCashbookAsset(cashbook.getCashbookAsset());
					addCashbook.setCashbookCategory(cashbook.getCashbookCategory());
					addCashbook.setCashbookMoney(cashbook.getCashbookMoney());
					addCashbook.setCashbookContent(cashbook.getCashbookContent());
					addCashbook.setCashbookMemo(cashbook.getCashbookMemo());
					addCashbook.setChallengeNo(cashbook.getChallengeNo());
					insertResult += cashbookDao.insertCashbookWithLoop(addCashbook);
					loopRound++;
				}
				result = updateResult+insertResult;		
			}
			if(result == cashbook.getLoopMonth()) {
				result = -1;//성공여부 판단
			}
		}
		return result;
	}

	public List calList(Cashbook cashbook) {
		return cashbookDao.calList(cashbook);
	}

	//오늘의 수입
	public int todayIncome(String memberId) {
		// TODO Auto-generated method stub
		return cashbookDao.todayIncome(memberId);
	}
	
	//오늘의 지출
	public int todaySpending(String memberId) {
		// TODO Auto-generated method stub
		return cashbookDao.todaySpending(memberId);
	}
	
	//라인 차트
	public Map lineDash(String memberId) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("memberId", memberId);
		ArrayList<ChartData> incomeList = new ArrayList<ChartData>();
		ArrayList<ChartData> spendList = new ArrayList<ChartData>();
		for(int i=1;i<13;i++) {
			param.put("month",i);
			param.put("type",1);
			ChartData income = cashbookDao.selectChart(param);
			incomeList.add(income);
			param.put("type",2);
			ChartData spend = cashbookDao.selectChart(param);
			spendList.add(spend);			
		}
		HashMap<String, List> map = new HashMap<String, List>();
		map.put("incomeList",incomeList);
		map.put("spendList",spendList);
		return map;
	}

}