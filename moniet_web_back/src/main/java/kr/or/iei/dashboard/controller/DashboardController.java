package kr.or.iei.dashboard.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.cashbook.model.service.CashbookService;
import kr.or.iei.cashbook.model.vo.Cashbook;
import kr.or.iei.cashbook.model.vo.Category;

@RestController
@RequestMapping(value="dashboard")
public class DashboardController {
	@Autowired
	private CashbookService cashbookService;
	
	//파이대시보드
	@PostMapping (value="/pie")
	public List pieDash(@RequestAttribute String memberId,@RequestBody Cashbook c) {
		int month = c.getMonth();
		System.out.println(month);
		return cashbookService.pieDash(memberId,month);
	}
	
	//바 대시보드
	@PostMapping (value="/bar")
	public Map barDash (@RequestAttribute String memberId ,@RequestBody Cashbook c1) {
		int month = c1.getMonth();
		List<Category> barList = cashbookService.barDash(memberId,month);
		List incomeBar = new ArrayList<Category>();
		List spendingBar = new ArrayList<Category>();
		for(Category c : barList) {
			if(c.getCategoryRef() == 1) {
				incomeBar.add(c);
			} else if(c.getCategoryRef()==2) {
				spendingBar.add(c);
			}
			System.out.println(incomeBar);
		}
		Map map = new HashMap<String, Object>();
		map.put("incomeBar", incomeBar);
		map.put("spendingBar",spendingBar);
		return map;
	}
	
	@PostMapping (value="todayIncome")
	public int todayIncome(@RequestAttribute String memberId) {
		return cashbookService.todayIncome(memberId);
	}
	
	@PostMapping (value="todaySpending")
	public int todaySpending(@RequestAttribute String memberId) {
		return cashbookService.todaySpending(memberId);
	}

}
