package kr.or.iei.cashbook.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.cashbook.model.vo.Cashbook;

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
	
	//파이 대시보드
	List pieDash(String memberId, int month);
	
	//바 대시보드
	List barDash(String memberId, int month);
	
	//라인 대시보드
	List lineDash(String memberId);

	int deleteCashbook(int cashbookNo, String memberId);

	int updateCashbook(Cashbook cashbook);

	List cashbookListIncome(Cashbook cashbook);




}
