package kr.or.iei.cashbook.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.iei.cashbook.model.vo.Cashbook;

@Mapper
public interface CashbookDao {

	List cashbookList(Cashbook cashbook);

	int totalSum(Cashbook cashbook);
	int sumOfIncome(Cashbook cashbook);
	int sumOfSpending(Cashbook cashbook);
	int totalCount(Cashbook cashbook);
	int countOfIncome(Cashbook cashbook);
	int countOfSpending(Cashbook cashbook);


	List category(String memberId);

	//파이 대시보드
	List pieDash(String memberId);
	
	//바 대시보드
	List barDash(String memberId);

	int insertCashbook(Cashbook cashbook);



}
