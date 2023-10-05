package kr.or.iei.cashbook.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.iei.cashbook.model.dao.CashbookDao;

@Service
public class CashbookService {

	@Autowired
	private CashbookDao cashbookDao;

	public List cashbookList() {
		return cashbookDao.cashbookList();
	}

	public Map sumOfCashbook() {
		int total = cashbookDao.totalSum();
		int sumOfIncome =cashbookDao.sumOfIncome(); 
		int sumOfSpending = cashbookDao.sumOfSpending();
		
		int totalCount = cashbookDao.totalCount();
		int countOfIncome = cashbookDao.countOfIncome();
		int countOfSpending = cashbookDao.countOfSpending();
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("total", total);
		map.put("income", sumOfIncome);
		map.put("spending", sumOfSpending);
		map.put("totalCount", totalCount);
		map.put("countIn", countOfIncome);
		map.put("countOut", countOfSpending);
		return map;
	}
}
