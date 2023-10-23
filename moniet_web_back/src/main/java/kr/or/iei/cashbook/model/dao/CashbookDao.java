package kr.or.iei.cashbook.model.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.cashbook.model.vo.Cashbook;
import kr.or.iei.cashbook.model.vo.ChartData;

@Mapper
public interface CashbookDao {

	List cashbookList(Cashbook cashbook);

	List cashbookListSpending(Cashbook cashbook);
	int totalSum(Cashbook cashbook);
	int sumOfIncome(Cashbook cashbook);
	int sumOfSpending(Cashbook cashbook);
	int totalCount(Cashbook cashbook);
	int countOfIncome(Cashbook cashbook);
	int countOfSpending(Cashbook cashbook);


	List category(String memberId);

	int insertCashbook(Cashbook cashbook);
	
	//파이 차트
	List pieDash(String memberId, int month);
	
	//바 차트
	List barDash(String memberId, int month);
	

	int deleteCashbook(int cashbookNo, String memberId);

	int updateCashbook(Cashbook cashbook);

	List cashbookListIncome(Cashbook cashbook);

	List calList(Cashbook cashbook);
	
	//오늘의 수입
	int todayIncome(String memberId);

	//오늘의 지출
	int todaySpending(String memberId);

	//라인차트
	ChartData selectChart(HashMap<String, Object> param);
	
	//챌린지 금액 상세 조회(지출)
	List viewData(String memberId, int challengeNo);
	
	//챌린지 금액 상세 조회(저축)
	List viewData2(String memberId, int challengeNo);

	ArrayList<Cashbook> cashbookListByLoopRef(int cashbookNo);

	int insertCashbookWithLoop(Cashbook c);

	Cashbook selectOneCashbook(int cashbookNo);


}
