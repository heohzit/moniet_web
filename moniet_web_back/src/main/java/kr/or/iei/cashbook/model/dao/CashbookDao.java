package kr.or.iei.cashbook.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CashbookDao {

	List cashbookList();

	int totalSum();

	int sumOfIncome();

	int sumOfSpending();

	int totalCount();

	int countOfIncome();

	int countOfSpending();

}
